import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { ACHIEVEMENTS } from '../constants/achievements';
import { getUnlockedAchievements, getAchievementStats } from '../services/achievementsService';
import { t } from '../i18n';

export default function AchievementsScreen({ visible, onClose, isPhone }) {
  const [unlockedIds, setUnlockedIds] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (visible) {
      loadAchievements();
    }
  }, [visible]);

  const loadAchievements = async () => {
    const unlocked = await getUnlockedAchievements();
    const achievementStats = await getAchievementStats();
    setUnlockedIds(unlocked);
    setStats(achievementStats);
  };

  const isUnlocked = (achievementId) => {
    return unlockedIds.includes(achievementId);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, isPhone ? styles.modalPhone : styles.modalTablet]}>
          {/* Nagłówek */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('achievements')}</Text>
            {stats && (
              <Text style={styles.statsText}>
                {stats.unlockedCount}/{stats.totalAchievements} • {stats.earnedPoints}/{stats.totalPoints} {t('points')}
              </Text>
            )}
          </View>

          {/* Lista osiągnięć */}
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            {ACHIEVEMENTS.map((achievement) => {
              const unlocked = isUnlocked(achievement.id);
              return (
                <View
                  key={achievement.id}
                  style={[
                    styles.achievementItem,
                    unlocked ? styles.achievementUnlocked : styles.achievementLocked
                  ]}
                >
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <View style={styles.achievementInfo}>
                    <Text style={[styles.achievementTitle, !unlocked && styles.textLocked]}>
                      {unlocked ? '✅ ' : '🔒 '}
                      {t(achievement.titleKey)}
                    </Text>
                    <Text style={[styles.achievementDescription, !unlocked && styles.textLocked]}>
                      {t(achievement.descriptionKey)}
                    </Text>
                    <Text style={[styles.achievementPoints, !unlocked && styles.textLocked]}>
                      {achievement.points} {t('points')}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Przycisk zamknięcia */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{t('close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalPhone: {
    width: '90%',
    maxHeight: '80%',
  },
  modalTablet: {
    width: '70%',
    maxHeight: '80%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statsText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  achievementUnlocked: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4CAF50',
  },
  achievementLocked: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
  },
  achievementIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  achievementPoints: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  textLocked: {
    color: '#999',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
