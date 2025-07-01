import { ScrollView, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import { useState, useEffect } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoCardTitle}>{title}</Text>
      <Text style={styles.infoCardValue}>{value}</Text>
    </View>
  );
}

export default function TabOneScreen() {
  const [uptime, setUptime] = useState(0);
  const [rooted, setRooted] = useState(false);
  const [deviceType, setDeviceType] = useState<Device.DeviceType | null>(null);
  useEffect(() => {
    Device.getUptimeAsync().then(setUptime);
    Device.isRootedExperimentalAsync().then(setRooted);
    Device.getDeviceTypeAsync().then(setDeviceType);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InfoCard title="Uptime" value={`${Math.round(uptime / 1000 / 60 / 60 / 24)} days`} />
      <InfoCard title="Brand" value={Device.brand ?? 'Unknown'} />
      <InfoCard title="Model" value={Device.modelName ?? 'Unknown'} />
      <InfoCard title="OS" value={Device.osBuildId ?? 'Unknown'} />
      <InfoCard title="OS Version" value={Device.osVersion ?? 'Unknown'} />
      <InfoCard title="Manufacturer" value={Device.manufacturer ?? 'Unknown'} />
      <InfoCard title="Rooted" value={rooted ? 'Yes' : 'No'} />
      <InfoCard title="Device Type" value={deviceType?.toString() ?? 'Unknown'} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  scrollView: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  infoCard: {
    backgroundColor: '#222222',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    width: '90%',
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCardValue: {
    fontSize: 14,
  },
});
