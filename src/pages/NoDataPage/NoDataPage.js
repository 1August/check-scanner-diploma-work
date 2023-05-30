import { RefreshControl, ScrollView, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { useCallback, useState } from 'react'
import { useSafeAreaViewStyles } from '../../hooks/useSafeAreaViewStyles'
import { useSelector } from 'react-redux'

export const NoDataPage = ({ message, onRefreshAction, showRefreshButton = true }) => {
	const theme = useTheme()
	const safeAreaViewStyles = useSafeAreaViewStyles()
	const strings = useSelector(state => state.localization.strings)

	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = useCallback(() => {
		setRefreshing(true)

		onRefreshAction?.()
		setRefreshing(false)
	}, [])

	if (onRefreshAction == null) return (
		<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text
					theme={theme}
					style={{ color: '#bbb', textAlign: 'center' }}
				>
					{message}
				</Text>
				{
					showRefreshButton && <Button
						icon={'refresh'}
						theme={theme}
						onPress={onRefreshAction}
					>
						{strings.refresh}
					</Button>
				}
			</View>
		</ScrollView>
	)
	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
		>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text
					theme={theme}
					style={{ color: '#bbbbbb', textAlign: 'center' }}
				>
					{message}
				</Text>
				{
					showRefreshButton && <Button
						icon={'refresh'}
						theme={theme}
						onPress={onRefreshAction}
					>
						{strings.refresh}
					</Button>
				}
			</View>
		</ScrollView>
	)
}
