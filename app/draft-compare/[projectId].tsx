import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Check, X } from 'lucide-react-native';
import { useDrafts } from '@/hooks/useDrafts';
import { Draft } from '@/types/database';

export default function DraftCompareScreen() {
  const { projectId } = useLocalSearchParams();
  const router = useRouter();
  const { drafts, loading } = useDrafts(projectId as string);

  const [leftDraft, setLeftDraft] = useState<Draft | null>(null);
  const [rightDraft, setRightDraft] = useState<Draft | null>(null);
  const [showDraftSelector, setShowDraftSelector] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    // Auto-select the two most recent drafts for comparison
    if (drafts.length >= 2) {
      setRightDraft(drafts[drafts.length - 1]); // Most recent
      setLeftDraft(drafts[drafts.length - 2]); // Second most recent
    } else if (drafts.length === 1) {
      setRightDraft(drafts[0]);
    }
  }, [drafts]);

  const selectDraft = (draft: Draft) => {
    if (showDraftSelector === 'left') {
      setLeftDraft(draft);
    } else if (showDraftSelector === 'right') {
      setRightDraft(draft);
    }
    setShowDraftSelector(null);
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

  const highlightDifferences = (text1: string, text2: string) => {
    // Simple difference highlighting - in a real implementation,
    // you'd use a proper diff library
    if (!text1 || !text2) return { left: text1 || '', right: text2 || '' };

    const words1 = text1.split(' ');
    const words2 = text2.split(' ');

    const differences: { left: string[], right: string[] } = {
      left: [],
      right: []
    };

    const maxLength = Math.max(words1.length, words2.length);

    for (let i = 0; i < maxLength; i++) {
      const word1 = words1[i] || '';
      const word2 = words2[i] || '';

      if (word1 !== word2) {
        differences.left.push(`**${word1}**`);
        differences.right.push(`**${word2}**`);
      } else {
        differences.left.push(word1);
        differences.right.push(word2);
      }
    }

    return {
      left: differences.left.join(' '),
      right: differences.right.join(' ')
    };
  };

  const differences = leftDraft && rightDraft
    ? highlightDifferences(leftDraft.content || '', rightDraft.content || '')
    : null;

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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compare Drafts</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Draft Selectors */}
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={styles.draftSelector}
          onPress={() => setShowDraftSelector('left')}
        >
          <Text style={styles.selectorLabel}>Left Draft</Text>
          {leftDraft ? (
            <View style={styles.selectedDraft}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getDraftStatusColor(leftDraft.status) }
                ]}
              />
              <Text style={styles.selectedDraftText}>
                v{leftDraft.version_number} - {leftDraft.title}
              </Text>
            </View>
          ) : (
            <Text style={styles.placeholderText}>Select draft</Text>
          )}
        </TouchableOpacity>

        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <TouchableOpacity
          style={styles.draftSelector}
          onPress={() => setShowDraftSelector('right')}
        >
          <Text style={styles.selectorLabel}>Right Draft</Text>
          {rightDraft ? (
            <View style={styles.selectedDraft}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getDraftStatusColor(rightDraft.status) }
                ]}
              />
              <Text style={styles.selectedDraftText}>
                v{rightDraft.version_number} - {rightDraft.title}
              </Text>
            </View>
          ) : (
            <Text style={styles.placeholderText}>Select draft</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Comparison View */}
      {leftDraft && rightDraft ? (
        <View style={styles.comparisonContainer}>
          {/* Left Draft */}
          <View style={styles.draftColumn}>
            <View style={styles.draftHeader}>
              <Text style={styles.draftTitle}>{leftDraft.title}</Text>
              <Text style={styles.draftMeta}>
                Version {leftDraft.version_number}
                {leftDraft.is_locked && ' • Locked'}
              </Text>
            </View>
            <ScrollView style={styles.draftContent}>
              <Text style={styles.draftText}>
                {differences ? differences.left : leftDraft.content}
              </Text>
            </ScrollView>
          </View>

          {/* Right Draft */}
          <View style={styles.draftColumn}>
            <View style={styles.draftHeader}>
              <Text style={styles.draftTitle}>{rightDraft.title}</Text>
              <Text style={styles.draftMeta}>
                Version {rightDraft.version_number}
                {rightDraft.is_locked && ' • Locked'}
              </Text>
            </View>
            <ScrollView style={styles.draftContent}>
              <Text style={styles.draftText}>
                {differences ? differences.right : rightDraft.content}
              </Text>
            </ScrollView>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Select two drafts to compare</Text>
          <Text style={styles.emptyText}>
            Choose drafts from the selectors above to see the differences side by side.
          </Text>
        </View>
      )}

      {/* Draft Selector Modal */}
      {showDraftSelector && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {showDraftSelector === 'left' ? 'Left' : 'Right'} Draft
              </Text>
              <TouchableOpacity
                onPress={() => setShowDraftSelector(null)}
                style={styles.closeButton}
              >
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.draftList}>
              {drafts.map((draft) => (
                <TouchableOpacity
                  key={draft.id}
                  style={styles.draftListItem}
                  onPress={() => selectDraft(draft)}
                >
                  <View style={styles.draftListItemLeft}>
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: getDraftStatusColor(draft.status) }
                      ]}
                    />
                    <View>
                      <Text style={styles.draftListTitle}>{draft.title}</Text>
                      <Text style={styles.draftListMeta}>
                        Version {draft.version_number}
                        {draft.is_locked && ' • Locked'}
                      </Text>
                    </View>
                  </View>
                  {(showDraftSelector === 'left' && leftDraft?.id === draft.id) ||
                   (showDraftSelector === 'right' && rightDraft?.id === draft.id) ? (
                    <Check size={20} color="#22c55e" />
                  ) : null}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
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
    justifyContent: 'space-between',
    padding: 20,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  draftSelector: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  selectorLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  selectedDraft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  selectedDraftText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
  },
  vsContainer: {
    paddingHorizontal: 16,
  },
  vsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
  },
  comparisonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  draftColumn: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  draftHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  draftTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  draftMeta: {
    fontSize: 12,
    color: '#666',
  },
  draftContent: {
    flex: 1,
    padding: 16,
  },
  draftText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  draftList: {
    maxHeight: 300,
  },
  draftListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  draftListItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  draftListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  draftListMeta: {
    fontSize: 12,
    color: '#666',
  },
});
