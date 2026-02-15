import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Sparkles,
  Eye,
  GitBranch,
  Lock,
  MoreVertical,
  Plus,
  RotateCcw,
  Download,
} from 'lucide-react-native';
import { useProjects } from '@/hooks/useProjects';
import { useDrafts } from '@/hooks/useDrafts';
import { aiService } from '@/lib/ai';
import { exportService, ExportOptions } from '@/lib/export';
import { Draft } from '@/types/database';

export default function DraftWorkspaceScreen() {
  const { projectId } = useLocalSearchParams();
  const router = useRouter();
  const { projects } = useProjects();
  const {
    drafts,
    loading,
    createDraft,
    updateDraft,
    createDraftFromParent,
    lockDraft
  } = useDrafts(projectId as string);

  const [project, setProject] = useState<any>(null);
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);

  // Animation values
  const fadeAnim = useState(new Animated.Value(1))[0];
  const slideAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const currentProject = projects.find(p => p.id === projectId);
    setProject(currentProject);
  }, [projects, projectId]);

  useEffect(() => {
    if (drafts.length > 0 && !selectedDraft) {
      setSelectedDraft(drafts[drafts.length - 1]); // Select latest draft
    }
  }, [drafts, selectedDraft]);

  // Animation effect when selected draft changes
  useEffect(() => {
    if (selectedDraft) {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [selectedDraft?.id]);

  const handleCreateFirstDraft = async () => {
    if (!project) return;

    try {
      // Create initial draft
      const draft = await createDraft({
        project_id: project.id,
        version_number: 1,
        title: 'Draft v1',
        content: '',
        status: 'generating',
        is_locked: false,
        metadata: {
          prompt: project.input_content,
          intent: project.intent,
        }
      });

      // Generate content with AI
      try {
        const aiResponse = await aiService.generate({
          type: 'generate',
          prompt: project.input_content,
          parameters: {
            intent: project.intent,
          }
        });

        // Update draft with generated content
        await updateDraft(draft.id, {
          content: aiResponse.content,
          status: 'completed',
          metadata: {
            ...draft.metadata,
            ai_metadata: aiResponse.metadata,
          }
        });

        Alert.alert('Success', 'Draft generated successfully!');
      } catch (aiError) {
        console.error('AI generation failed:', aiError);
        // Update draft status to failed
        await updateDraft(draft.id, {
          status: 'failed',
          content: 'Failed to generate content. Please try again.',
        });
        Alert.alert('Error', 'AI generation failed. Please try again.');
      }

    } catch (error) {
      Alert.alert('Error', 'Failed to create draft');
    }
  };

  const handleImproveDraft = async (draft: Draft) => {
    if (!draft.content) return;

    try {
      // Create new draft from parent
      const newDraft = await createDraftFromParent(draft.id, '', {
        improvement_type: 'refine',
        parent_version: draft.version_number,
      });

      // Generate improved content with AI
      try {
        const aiResponse = await aiService.generate({
          type: 'improve',
          prompt: draft.content,
          context: `Original draft from version ${draft.version_number}`,
        });

        // Update new draft with improved content
        await updateDraft(newDraft.id, {
          content: aiResponse.content,
          status: 'completed',
          metadata: {
            ...newDraft.metadata,
            ai_metadata: aiResponse.metadata,
          }
        });

        Alert.alert('Success', 'Improved draft created!');
      } catch (aiError) {
        console.error('AI improvement failed:', aiError);
        await updateDraft(newDraft.id, {
          status: 'failed',
          content: 'Failed to improve content. Please try again.',
        });
        Alert.alert('Error', 'AI improvement failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create improved draft');
    }
  };

  const handleBranchDraft = async (draft: Draft) => {
    if (!draft.content) return;

    try {
      // Create branched draft from parent
      const newDraft = await createDraftFromParent(draft.id, '', {
        branch_type: 'alternative',
        parent_version: draft.version_number,
      });

      // Generate alternative version with AI
      try {
        const aiResponse = await aiService.generate({
          type: 'rewrite',
          prompt: draft.content,
          context: `Create an alternative version of this draft with different approach, tone, or structure. Original draft from version ${draft.version_number}`,
        });

        // Update branched draft with alternative content
        await updateDraft(newDraft.id, {
          content: aiResponse.content,
          status: 'completed',
          metadata: {
            ...newDraft.metadata,
            ai_metadata: aiResponse.metadata,
          }
        });

        Alert.alert('Success', 'Alternative draft created!');
      } catch (aiError) {
        console.error('AI branching failed:', aiError);
        await updateDraft(newDraft.id, {
          status: 'failed',
          content: 'Failed to create alternative version. Please try again.',
        });
        Alert.alert('Error', 'AI branching failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to branch draft');
    }
  };

  const handleLockDraft = async (draft: Draft) => {
    Alert.alert(
      'Lock Draft',
      'This will mark the draft as final. You won\'t be able to edit it anymore.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Lock',
          style: 'destructive',
          onPress: async () => {
            try {
              await lockDraft(draft.id);
              Alert.alert('Success', 'Draft locked successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to lock draft');
            }
          }
        }
      ]
    );
  };

  const handleUndoToDraft = async (targetDraft: Draft) => {
    if (!selectedDraft) return;

    // Button press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Alert.alert(
      'Undo to Previous Version',
      `This will revert to version ${targetDraft.version_number}. Any drafts created after this version will remain but won't be the active version.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Undo',
          style: 'destructive',
          onPress: async () => {
            try {
              setSelectedDraft(targetDraft);
              Alert.alert('Success', `Reverted to ${targetDraft.title}`);
            } catch (error) {
              Alert.alert('Error', 'Failed to undo');
            }
          }
        }
      ]
    );
  };

  const handleExportDraft = async (draft: Draft, format: 'pdf' | 'txt' | 'html') => {
    if (!draft.content) {
      Alert.alert('Error', 'Draft has no content to export');
      return;
    }

    if (!draft.is_locked) {
      Alert.alert(
        'Draft Not Locked',
        'Please lock this draft before exporting to ensure final quality.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Lock & Export',
            onPress: async () => {
              await lockDraft(draft.id);
              await performExport(draft, format);
            }
          }
        ]
      );
      return;
    }

    await performExport(draft, format);
  };

  const performExport = async (draft: Draft, format: 'pdf' | 'txt' | 'html') => {
    try {
      Alert.alert('Exporting...', 'Generating your file...');

      const exportOptions: ExportOptions = {
        format,
        quality: 'premium',
        title: draft.title,
        author: 'White Space User',
        includeMetadata: true,
      };

      const result = await exportService.export(draft.content!, exportOptions);

      if (result.success) {
        Alert.alert(
          'Export Complete',
          `Your ${format.toUpperCase()} file has been generated. Would you like to share it?`,
          [
            { text: 'Later', style: 'cancel' },
            {
              text: 'Share',
              onPress: async () => {
                try {
                  await exportService.shareExport(result);
                } catch (shareError) {
                  Alert.alert('Share Failed', 'Could not share the file');
                }
              }
            }
          ]
        );
      } else {
        Alert.alert('Export Failed', result.error || 'Unknown error occurred');
      }
    } catch (error) {
      Alert.alert('Export Failed', 'An unexpected error occurred');
    }
  };

  const getDraftStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'generating': return '#f59e0b';
      case 'failed': return '#ef4444';
      case 'locked': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading drafts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaViewContext style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              // If no screen to go back to, go to projects tab
              router.replace('/(tabs)/projects' as any);
            }
          }}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.projectTitle}>{project?.title}</Text>
          <Text style={styles.draftCount}>
            {drafts.length} draft{drafts.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Draft Timeline */}
      <View style={styles.timelineContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.timelineContent}
        >
          {drafts
            .sort((a, b) => a.version_number - b.version_number)
            .map((draft, index) => {
              const isSelected = selectedDraft?.id === draft.id;
              const hasBranch = drafts.some(d => d.parent_draft_id === draft.id);

              return (
                <View key={draft.id} style={styles.timelineItemContainer}>
                  <TouchableOpacity
                    style={[
                      styles.timelineItem,
                      isSelected && styles.timelineItemSelected,
                    ]}
                    onPress={() => setSelectedDraft(draft)}
                  >
                    <View
                      style={[
                        styles.timelineDot,
                        { backgroundColor: getDraftStatusColor(draft.status) }
                      ]}
                    />
                    <Text style={[
                      styles.timelineVersion,
                      isSelected && styles.timelineVersionSelected
                    ]}>
                      v{draft.version_number}
                    </Text>
                    {draft.is_locked && <Lock size={12} color="#8b5cf6" />}
                  </TouchableOpacity>

                  {/* Branch indicator */}
                  {hasBranch && (
                    <View style={styles.branchIndicator}>
                      <GitBranch size={10} color="#666" />
                    </View>
                  )}

                  {/* Connection line to next draft */}
                  {index < drafts.length - 1 && (
                    <View style={styles.timelineConnector} />
                  )}
                </View>
              );
            })}

          {drafts.length === 0 && (
            <TouchableOpacity
              style={styles.createFirstDraft}
              onPress={handleCreateFirstDraft}
            >
              <Plus size={20} color="#000" />
              <Text style={styles.createFirstDraftText}>Create First Draft</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentArea}>
        {selectedDraft ? (
          <Animated.ScrollView
            style={[styles.draftContent, { opacity: fadeAnim }]}
          >
            <View style={styles.draftHeader}>
              <Text style={styles.draftTitle}>{selectedDraft.title}</Text>
              <View style={styles.draftActions}>
                {/* Undo button - only show if there are previous drafts */}
                {drafts.some(d => d.version_number < selectedDraft.version_number) && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.undoButton]}
                    onPress={() => {
                      const previousDraft = drafts
                        .filter(d => d.version_number < selectedDraft.version_number)
                        .sort((a, b) => b.version_number - a.version_number)[0];
                      if (previousDraft) {
                        handleUndoToDraft(previousDraft);
                      }
                    }}
                  >
                    <RotateCcw size={16} color="#fff" />
                    <Text style={styles.undoButtonText}>Undo</Text>
                  </TouchableOpacity>
                )}

                {!selectedDraft.is_locked && (
                  <>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleImproveDraft(selectedDraft)}
                    >
                      <Sparkles size={16} color="#000" />
                      <Text style={styles.actionButtonText}>Improve</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleBranchDraft(selectedDraft)}
                    >
                      <GitBranch size={16} color="#000" />
                      <Text style={styles.actionButtonText}>Branch</Text>
                    </TouchableOpacity>
                  </>
                )}

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => router.push(`/draft-compare/${projectId}` as any)}
                >
                  <Eye size={16} color="#000" />
                  <Text style={styles.actionButtonText}>Compare</Text>
                </TouchableOpacity>

                {!selectedDraft.is_locked && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.lockButton]}
                    onPress={() => handleLockDraft(selectedDraft)}
                  >
                    <Lock size={16} color="#fff" />
                    <Text style={styles.lockButtonText}>Lock</Text>
                  </TouchableOpacity>
                )}

                {selectedDraft.is_locked && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.exportButton]}
                    onPress={() => {
                      Alert.alert(
                        'Export Draft',
                        'Choose export format:',
                        [
                          { text: 'Cancel', style: 'cancel' },
                          {
                            text: 'PDF',
                            onPress: () => handleExportDraft(selectedDraft, 'pdf')
                          },
                          {
                            text: 'Text',
                            onPress: () => handleExportDraft(selectedDraft, 'txt')
                          },
                          {
                            text: 'HTML',
                            onPress: () => handleExportDraft(selectedDraft, 'html')
                          },
                        ]
                      );
                    }}
                  >
                    <Download size={16} color="#fff" />
                    <Text style={styles.exportButtonText}>Export</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.draftBody}>
              <Text style={styles.draftContentText}>
                {selectedDraft.content || 'Generating content...'}
              </Text>
            </View>
          </Animated.ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No drafts yet</Text>
            <Text style={styles.emptyText}>
              Create your first draft to start iterating on your idea.
            </Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateFirstDraft}
            >
              <Sparkles size={20} color="#fff" />
              <Text style={styles.createButtonText}>Generate First Draft</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaViewContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  draftCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineContainer: {
    maxHeight: 80,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  timelineContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  timelineItemContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  timelineItem: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    minWidth: 60,
    marginHorizontal: 4,
  },
  timelineItemSelected: {
    backgroundColor: '#000',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  timelineVersion: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  timelineVersionSelected: {
    color: '#fff',
  },
  branchIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timelineConnector: {
    position: 'absolute',
    top: 30,
    left: '60%',
    right: '-40%',
    height: 2,
    backgroundColor: '#e5e5e5',
    zIndex: -1,
  },
  createFirstDraft: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#000',
    gap: 8,
  },
  createFirstDraftText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  contentArea: {
    flex: 1,
  },
  draftContent: {
    flex: 1,
  },
  draftHeader: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  draftTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  draftActions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  lockButton: {
    backgroundColor: '#8b5cf6',
  },
  lockButtonText: {
    color: '#fff',
  },
  undoButton: {
    backgroundColor: '#ef4444',
  },
  undoButtonText: {
    color: '#fff',
  },
  exportButton: {
    backgroundColor: '#10b981',
  },
  exportButtonText: {
    color: '#fff',
  },
  draftBody: {
    padding: 20,
  },
  draftContentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#000',
    borderRadius: 12,
    gap: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
