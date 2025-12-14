import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  FileText,
  Image,
  Video,
  Download,
  Share2,
  RefreshCw,
  X,
} from 'lucide-react-native';

interface Output {
  type: string;
  title: string;
  icon: typeof FileText;
}

interface ResultsModalProps {
  visible: boolean;
  onClose: () => void;
}

const SAMPLE_OUTPUTS: Output[] = [
  { type: 'deck', title: 'Slide Deck', icon: FileText },
  { type: 'image', title: 'Social Image', icon: Image },
  { type: 'video', title: 'Video Clip', icon: Video },
];

export default function ResultsModal({ visible, onClose }: ResultsModalProps) {
  const handleSave = (output: Output) => {
    Alert.alert('Save', `Saving ${output.title} to Drive...`);
  };

  const handleShare = (output: Output) => {
    Alert.alert('Share', `Sharing ${output.title}...`);
  };

  const handleRegenerate = (output: Output) => {
    Alert.alert('Regenerate', `Creating new variation of ${output.title}...`);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Your Assets</Text>
            <Text style={styles.subtitle}>3 outputs generated</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {SAMPLE_OUTPUTS.map((output, index) => {
            const IconComponent = output.icon;
            return (
              <View key={index} style={styles.outputCard}>
                <View style={styles.outputHeader}>
                  <View style={styles.outputTitleRow}>
                    <View style={styles.outputIconContainer}>
                      <IconComponent size={24} color="#000" />
                    </View>
                    <Text style={styles.outputTitle}>{output.title}</Text>
                  </View>
                  <View style={styles.readyBadge}>
                    <Text style={styles.readyText}>Ready</Text>
                  </View>
                </View>

                <View style={styles.previewContainer}>
                  <Text style={styles.previewText}>Preview placeholder</Text>
                </View>

                <View style={styles.outputActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleSave(output)}>
                    <Download size={18} color="#000" />
                    <Text style={styles.actionButtonText}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleShare(output)}>
                    <Share2 size={18} color="#000" />
                    <Text style={styles.actionButtonText}>Share</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleRegenerate(output)}>
                    <RefreshCw size={18} color="#000" />
                    <Text style={styles.actionButtonText}>Regenerate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          <View style={styles.suggestionsCard}>
            <Text style={styles.suggestionsTitle}>Suggested Actions</Text>
            <TouchableOpacity style={styles.suggestionRow}>
              <Text style={styles.suggestionText}>
                Save deck to Drive folder "White Space Projects"
              </Text>
              <Text style={styles.suggestionAction}>Enable</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.newProjectButton} onPress={onClose}>
            <Text style={styles.newProjectButtonText}>Create New Project</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
  },
  outputCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  outputTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  outputIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outputTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  readyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#dcfce7',
    borderRadius: 8,
  },
  readyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
  },
  previewContainer: {
    height: 120,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  previewText: {
    fontSize: 14,
    color: '#999',
  },
  outputActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  suggestionsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  suggestionText: {
    fontSize: 13,
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  suggestionAction: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  newProjectButton: {
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  newProjectButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
