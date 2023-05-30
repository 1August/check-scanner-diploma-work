import { Linking, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'
import { useSelector } from 'react-redux'

export const ChequePage = ({ route }) => {
	const theme = useTheme()
	const safeAreaViewStyles = useSafeAreaViewStyles()
	const strings = useSelector(state => state.localization.strings)

	const cheque = JSON.parse(route.params.cheque)
	const chequeDate = new Date(Date.parse(cheque?.date))

	const s = StyleSheet.create({
		chequePage: {
			flex: 1,
		},
		container: {
			flex: 1,
			paddingTop: 24,
			paddingBottom: 24,
		},
		cheque: {
			marginHorizontal: 16,

			borderWidth: 1,
			borderStyle: 'dashed',
			borderColor: theme.colors.outline,

			borderRadius: 8,
		},
		chequeHeader: {
			borderTopLeftRadius: 8,
			borderTopRightRadius: 8,
		},
		chequeHeaderButton: {},
		chequeTitle: {
			fontSize: 22,
			lineHeight: 24,
		},

		chequeRow: {
			paddingHorizontal: 16,
			paddingVertical: 12,
		},
		chequeRowBorderBottom: {
			borderStyle: 'dashed',
			borderBottomWidth: 1,
			borderColor: theme.colors.outline,
		},
		chequeRowProductDescription: {
			color: theme.colors.outline,
		},
		productRowBottom: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		chequeRowCost: {
			textAlign: 'right',
		},
		chequeFooter: {
			backgroundColor: theme.dark ?
				theme.colors.secondaryContainer :
				theme.colors.success,

			flex: 1,
			flexDirection: 'column',

			paddingVertical: 32,
			paddingHorizontal: 16,
		},
		chequeFooterText: {
			color: theme.colors.onSuccess,
		},
		chequeTotal: {
			fontSize: 48,
		},
		qrCodeWrapper: {
			backgroundColor: theme.colors.background,

			paddingVertical: 40,

			justifyContent: 'center',
			alignItems: 'center',

			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8,
		},
	})

	return (
		<View style={s.homePage}>
			<ScrollView>
				<View style={s.container}>
					<View style={s.cheque}>
						<View style={s.chequeHeader}>
							<Button
								style={s.chequeHeaderButton}
								mode={'text'}
								icon={'link-variant'}
								labelStyle={s.chequeTitle}
								contentStyle={{ paddingVertical: 8, flexDirection: 'row-reverse' }}
								onPress={() => Linking.openURL(cheque?.url || '')}
							>
								{strings.cheque}
							</Button>
						</View>
						<View>
							<View style={s.chequeFooter}>
								<View>
									<Text
										style={[s.chequeTotal, s.chequeFooterText]}
									>
										{cheque.total} {strings.currency}
									</Text>
								</View>
								<View>
									<Text
										style={[s.chequeFooterText]}
									>
										{strings.date}: {chequeDate.toDateString()}
									</Text>
								</View>
							</View>
						</View>
						<View>
							{
								cheque.chequeRows.map((row, i) => (
										<View
											key={row._id}
											style={[s.chequeRow, s.chequeRowBorderBottom]}
										>
											<View>
												<Text
													variant={'bodyMedium'}
													style={s.chequeRowProductDescription}
												>
													{strings.productName}
												</Text>
												<Text
													variant={'titleMedium'}
												>
													{row.name}
												</Text>
											</View>
											<View
												style={s.productRowBottom}
											>
												<Text
													style={s.chequeRowCost}
												>
													{row.cost} {strings.currency} x {row.count} =
												</Text>
												<Text variant={'bodyLarge'}>
													{row.overall} {strings.currency}
												</Text>
											</View>
										</View>
									),
								)
							}
						</View>
						<View style={s.qrCodeWrapper}>
							<QRCode
								backgroundColor={theme.colors.background}
								color={theme.dark ? theme.colors.onPrimaryContainer : theme.colors.primary}
								value={cheque.url}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}
