import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { img_ui_check } from '../../assets'
import {
  Header,
  HeaderButton,
  HeaderSpinner,
  Picker,
  TextBox
} from '../../components/common'
import { data_countries } from '../../data'
import { useOnboarding } from '../../hooks'
import { colors, layout, typography } from '../../styles'
import { PickerItemType } from '../../types'
import { OnboardingParamList } from '.'

interface Props {
  navigation: StackNavigationProp<OnboardingParamList, 'Onboarding'>
  route: RouteProp<OnboardingParamList, 'Onboarding'>
}

export const Onboarding: FunctionComponent<Props> = ({
  navigation: { setOptions },
  route: {
    params: { userId }
  }
}) => {
  const { completeOnboarding, onboarding } = useOnboarding()

  const [name, setName] = useState('')
  const [country, setCountry] = useState<PickerItemType>()
  const [city, setCity] = useState<PickerItemType>()

  useEffect(() => {
    setOptions({
      header: (props) => (
        <Header
          {...props}
          right={
            onboarding ? (
              <HeaderSpinner />
            ) : (
              <HeaderButton
                icon={img_ui_check}
                onPress={() => {
                  if (name && country && city) {
                    completeOnboarding(userId, name, country.value, city.value)
                  }
                }}
              />
            )
          }
        />
      )
    })
  }, [city, completeOnboarding, country, name, onboarding, setOptions, userId])

  const countries = Object.keys(data_countries)
  const cities = country ? data_countries[country.value] : []

  return (
    <ScrollView
      contentContainerStyle={styles.main}
      keyboardShouldPersistTaps="always">
      <Text style={styles.label}>
        Helpling doesn't reveal your real name to anyone.{'\n'}Pick a username.
      </Text>
      <TextBox
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(name) => setName(name)}
        placeholder="Username"
        value={name}
      />
      <Text style={styles.label}>
        Choose your location so we can show you requests near you.
      </Text>
      <Picker
        data={countries.map((country) => ({
          label: country,
          value: country
        }))}
        onChange={(country) => {
          setCountry(country)
          setCity(undefined)
        }}
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
  )
}

const styles = StyleSheet.create({
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
