import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Project, Draft, DraftOutput } from '@/types/database';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setProjects(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Partial<Project>) => {
    try {
      console.log('🔍 DEBUG: Attempting to create project with data:', projectData);

      const { data, error: createError } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (createError) {
        console.error('🔍 DEBUG: Supabase create error:', createError);
        console.error('🔍 DEBUG: Error details:', {
          message: createError.message,
          details: createError.details,
          hint: createError.hint,
          code: createError.code
        });
        throw createError;
      }

      console.log('🔍 DEBUG: Project created successfully:', data);
      await fetchProjects();
      return data;
    } catch (err) {
      console.error('🔍 DEBUG: Exception in createProject:', err);
      throw new Error(
        err instanceof Error ? err.message : 'Failed to create project'
      );
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const { error: updateError } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id);

      if (updateError) throw updateError;
      await fetchProjects();
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : 'Failed to update project'
      );
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchProjects();
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : 'Failed to delete project'
      );
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}
