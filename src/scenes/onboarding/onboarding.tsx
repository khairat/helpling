import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import { Button, Picker, TextBox } from '../../components/common'
import { data_countries } from '../../data'
import { useOnboarding } from '../../hooks'
import { colors, layout, typography } from '../../styles'
import { PickerItem } from '../../types'
import { OnboardingParamList } from '.'

interface Props {
  navigation: StackNavigationProp<OnboardingParamList, 'Onboarding'>
  route: RouteProp<OnboardingParamList, 'Onboarding'>
}

export const Onboarding: FunctionComponent<Props> = ({
  route: {
    params: { userId }
  }
}) => {
  const { bottom } = useSafeArea()

  const { completeOnboarding, onboarding } = useOnboarding()

  const [username, setUsername] = useState('')
  const [country, setCountry] = useState<PickerItem>()
  const [city, setCity] = useState<PickerItem>()

  const countries = Object.keys(data_countries)
  const cities = country ? data_countries[country.value] : []

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.main}
        keyboardShouldPersistTaps="always">
        <Text style={styles.label}>
          Helpling doesn't reveal your real name to anyone.{'\n'}Pick a
          username.
        </Text>
        <TextBox
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(username) => setUsername(username)}
          placeholder="Username"
          value={username}
        />
        <Text style={styles.label}>
          Choose your location so we can show you requests near you.
        </Text>
        <Picker
          data={countries.map((country) => ({
            label: country,
            value: country
          }))}
          onChange={(country) => setCountry(country)}
          placeholder="Country"
          selected={country}
          title="Select your country"
        />
        {country && (
          <Picker
            data={cities.map((city) => ({
              label: city,
              value: city
            }))}
            onChange={(city) => setCity(city)}
            placeholder="City"
            selected={city}
            style={styles.picker}
            title="Select your city"
          />
        )}
      </ScrollView>
      <Button
        label="Finish"
        loading={onboarding}
        onPress={() => {
          console.log({
            city,
            country,
            username
          })

          if (username && country && city) {
            completeOnboarding(userId, username, country.value, city.value)
          }
        }}
        style={[
          styles.button,
          {
            marginBottom: bottom + layout.margin
          }
        ]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: layout.margin
  },
  label: {
    ...typography.paragraph,
    color: colors.foreground,
    marginBottom: layout.padding,
    marginTop: layout.margin
  },
  main: {
    flex: 1,
    padding: layout.margin,
    paddingTop: 0
  },
  picker: {
    marginTop: layout.padding
  }
})
