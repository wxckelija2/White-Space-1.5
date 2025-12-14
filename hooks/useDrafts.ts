import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Draft, DraftOutput } from '@/types/database';

export function useDrafts(projectId?: string) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDrafts = async (projectIdFilter?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('drafts')
        .select('*')
        .order('version_number', { ascending: true });

      if (projectIdFilter) {
        query = query.eq('project_id', projectIdFilter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setDrafts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch drafts');
    } finally {
      setLoading(false);
    }
  };

  const createDraft = async (draftData: Omit<Draft, 'id' | 'created_at'>) => {
    try {
      const { data, error: createError } = await supabase
        .from('drafts')
        .insert([draftData])
        .select()
        .single();

      if (createError) throw createError;
      await fetchDrafts(projectId);
      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : 'Failed to create draft'
      );
    }
  };

  const updateDraft = async (id: string, updates: Partial<Draft>) => {
    try {
      const { error: updateError } = await supabase
        .from('drafts')
        .update(updates)
        .eq('id', id);

      if (updateError) throw updateError;
      await fetchDrafts(projectId);
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : 'Failed to update draft'
      );
    }
  };

  const lockDraft = async (id: string) => {
    try {
      const { error: lockError } = await supabase
        .from('drafts')
        .update({
          is_locked: true,
          locked_at: new Date().toISOString(),
          status: 'locked'
        })
        .eq('id', id);

      if (lockError) throw lockError;
      await fetchDrafts(projectId);
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : 'Failed to lock draft'
      );
    }
  };

  const createDraftFromParent = async (
    parentDraftId: string,
    newContent?: string,
    metadata?: Record<string, any>
  ) => {
    try {
      // Get the parent draft to determine the project and version number
      const { data: parentDraft, error: parentError } = await supabase
        .from('drafts')
        .select('project_id, version_number')
        .eq('id', parentDraftId)
        .single();

      if (parentError) throw parentError;

      // Get the next version number for this project
      const { data: latestDraft, error: versionError } = await supabase
        .from('drafts')
        .select('version_number')
        .eq('project_id', parentDraft.project_id)
        .order('version_number', { ascending: false })
        .limit(1)
        .single();

      const nextVersion = (latestDraft?.version_number || 0) + 1;

      const newDraft = await createDraft({
        project_id: parentDraft.project_id,
        parent_draft_id: parentDraftId,
        version_number: nextVersion,
        title: `Draft v${nextVersion}`,
        content: newContent,
        status: 'generating',
        is_locked: false,
        metadata: metadata || {}
      });

      return newDraft;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : 'Failed to create draft from parent'
      );
    }
  };

  const getDraftOutputs = async (draftId: string): Promise<DraftOutput[]> => {
    try {
      const { data, error } = await supabase
        .from('draft_outputs')
        .select('*')
        .eq('draft_id', draftId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : 'Failed to fetch draft outputs'
      );
    }
  };

  const createDraftOutput = async (outputData: Omit<DraftOutput, 'id' | 'created_at'>) => {
    try {
      const { data, error: createError } = await supabase
        .from('draft_outputs')
        .insert([outputData])
        .select()
        .single();

      if (createError) throw createError;
      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : 'Failed to create draft output'
      );
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchDrafts(projectId);
    } else {
      fetchDrafts();
    }
  }, [projectId]);

  return {
    drafts,
    loading,
    error,
    fetchDrafts,
    createDraft,
    updateDraft,
    lockDraft,
    createDraftFromParent,
    getDraftOutputs,
    createDraftOutput,
  };
}
