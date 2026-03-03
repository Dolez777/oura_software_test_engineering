import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

interface HealthData {
  score: number;
  status: string;
}

export default function App() {
  const [sleep, setSleep] = useState<HealthData | null>(null);
  const [activity, setActivity] = useState<HealthData | null>(null);
  const [readiness, setReadiness] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chaosMode, setChaosMode] = useState(false);

  // In a real device/emulator we'd use local IP instead of localhost, 
  // but for testing or web run, 127.0.0.1 is fine.
  // Updated to 127.0.0.1 since you are using USB Debugging!
  // We will run `adb reverse tcp:8000 tcp:8000` to magically pipe this port to your phone.
  const API_BASE = "http://127.0.0.1:8000/api/v2/usercollection";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const chaosParam = chaosMode ? "?chaos=true" : "";
      const [sleepRes, actRes, readRes] = await Promise.all([
        fetch(`${API_BASE}/sleep${chaosParam}`),
        fetch(`${API_BASE}/activity${chaosParam}`),
        fetch(`${API_BASE}/readiness${chaosParam}`),
      ]);

      if (!sleepRes.ok || !actRes.ok || !readRes.ok) {
        throw new Error("HTTP 500: Server Chaos");
      }

      setSleep(await sleepRes.json());
      setActivity(await actRes.json());
      setReadiness(await readRes.json());

    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [chaosMode]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} testID="app-root" accessibilityLabel="app-root">
      <View style={styles.header}>
        <Text style={styles.title} testID="header-title" accessibilityLabel="header-title">Oura Clone</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.button, chaosMode ? styles.buttonActive : null]} 
          onPress={() => setChaosMode(!chaosMode)}
          testID="chaos-mode-toggle"
          accessibilityLabel="chaos-mode-toggle"
        >
          <Text style={styles.buttonText}>{chaosMode ? "Chaos ON" : "Chaos OFF"}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={fetchData}
          testID="refresh-button"
          accessibilityLabel="refresh-button"
        >
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" testID="loading-indicator" accessibilityLabel="loading-indicator" />
        ) : error ? (
          <View style={styles.errorBox} testID="error-box" accessibilityLabel="error-box">
            <Text style={styles.errorText} testID="error-message" accessibilityLabel="error-message">{error}</Text>
          </View>
        ) : (
          <View style={styles.cardsContainer} testID="dashboard-cards" accessibilityLabel="dashboard-cards">
            <MetricCard title="Readiness" data={readiness} testIDPrefix="readiness" />
            <MetricCard title="Sleep" data={sleep} testIDPrefix="sleep" />
            <MetricCard title="Activity" data={activity} testIDPrefix="activity" />
          </View>
        )}
      </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const MetricCard = ({ title, data, testIDPrefix }: { title: string, data: HealthData | null, testIDPrefix: string }) => {
  return (
    <View style={styles.card} testID={`${testIDPrefix}-card`} accessibilityLabel={`${testIDPrefix}-card`}>
      <Text style={styles.cardTitle} testID={`${testIDPrefix}-title`} accessibilityLabel={`${testIDPrefix}-title`}>{title}</Text>
      <Text style={styles.cardScore} testID={`${testIDPrefix}-score`} accessibilityLabel={`${testIDPrefix}-score`}>
        {data?.score !== null && data?.score !== undefined ? data.score : "N/A"}
      </Text>
      <Text style={styles.cardStatus} testID={`${testIDPrefix}-status`} accessibilityLabel={`${testIDPrefix}-status`}>
        {data?.status || "Unknown"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Deep black for premium look
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  buttonActive: {
    borderColor: '#FF003C',
    backgroundColor: '#4A0000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  errorBox: {
    padding: 20,
    backgroundColor: 'rgba(255,0,0,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF003C',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF003C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flex: 1,
    gap: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 25,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    color: '#aaa',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  cardScore: {
    color: '#FFD700', // Gold accents
    fontSize: 36,
    fontWeight: 'bold',
  },
  cardStatus: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    opacity: 0.8,
  }
});
