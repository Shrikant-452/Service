import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Wallet, ArrowDownLeft, ArrowUpRight, Plus, AlertCircle } from 'lucide-react-native';
import { COLORS, SHADOWS } from '../theme/colors';
import { fetchWalletDetails } from '../services/api';

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
}

interface WalletData {
  balance: number;
  transactions: Transaction[];
}

export const WalletScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await fetchWalletDetails();
      setData(response as WalletData);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (err) {
      setError('Failed to load wallet details.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Fetching balance...</Text>
        </View>
      );
    }

    if (error || !data) {
      return (
        <View style={styles.centerContainer}>
          <AlertCircle size={48} color={COLORS.danger} style={{ marginBottom: 12 }} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadWalletData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Wallet size={20} color={COLORS.white} opacity={0.8} />
            </View>
            <Text style={styles.balanceAmount}>₹{data.balance}</Text>
            
            <TouchableOpacity style={styles.addMoneyButton} activeOpacity={0.85}>
              <Plus size={16} color={COLORS.primary} />
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>
          </View>

          {/* Transactions Header */}
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {/* Transactions List */}
          <View style={styles.transactionsContainer}>
            {data.transactions.map((txn, index) => (
              <View 
                key={txn.id} 
                style={[
                  styles.transactionRow, 
                  index === data.transactions.length - 1 && styles.lastTransactionRow
                ]}
              >
                <View style={styles.txnLeft}>
                  <View style={[
                    styles.iconCircle,
                    txn.type === 'credit' ? styles.creditIcon : styles.debitIcon
                  ]}>
                    {txn.type === 'credit' ? (
                      <ArrowDownLeft size={16} color="#059669" />
                    ) : (
                      <ArrowUpRight size={16} color="#DC2626" />
                    )}
                  </View>
                  <View style={styles.txnInfo}>
                    <Text style={styles.txnTitle}>{txn.title}</Text>
                    <Text style={styles.txnDate}>{txn.date}</Text>
                  </View>
                </View>
                
                <Text style={[
                  styles.txnAmount,
                  txn.type === 'credit' ? styles.amountCredit : styles.amountDebit
                ]}>
                  {txn.type === 'credit' ? '+' : ''}₹{Math.abs(txn.amount)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Wallet</Text>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    ...SHADOWS.medium,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.white,
    marginBottom: 20,
  },
  addMoneyButton: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  addMoneyText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 12,
    marginLeft: 4,
  },
  transactionsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: 16,
    ...SHADOWS.small,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  lastTransactionRow: {
    borderBottomWidth: 0,
  },
  txnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditIcon: {
    backgroundColor: '#D1FAE5',
  },
  debitIcon: {
    backgroundColor: '#FEE2E2',
  },
  txnInfo: {
    justifyContent: 'center',
  },
  txnTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  txnDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  txnAmount: {
    fontSize: 15,
    fontWeight: '800',
  },
  amountCredit: {
    color: '#059669',
  },
  amountDebit: {
    color: COLORS.textPrimary,
  },
});
