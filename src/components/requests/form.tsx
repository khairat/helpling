import { startCase } from 'lodash'
import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { img_types } from '../../assets'
import { data_countries } from '../../data'
import { useAuth } from '../../store'
import { colors, layout, typography } from '../../styles'
import {
  PickerItemType,
  RequestInputType,
  RequestType,
  RequestTypeType
} from '../../types'
import { Button, Picker, Separator, TextBox, Touchable } from '../common'

interface Props {
  kind: 'offer' | 'request'
  loading: boolean
  item?: RequestType

  onCreate?: (data: RequestInputType) => void
  onUpdate?: (id: string, description: string) => void
}

export const Form: FunctionComponent<Props> = ({
  item,
  kind,
  loading,
  onCreate,
  onUpdate
}) => {
  const [{ user }] = useAuth()

  const [description, setDescription] = useState(item ? item.description : '')
  const [type, setType] = useState<RequestTypeType | undefined>(item?.type)
  const [country, setCountry] = useState<PickerItemType>()
  const [city, setCity] = useState<PickerItemType>()

  useEffect(() => {
    if (user) {
      const { city, country } = user

      setCountry({
        label: country,
        value: country
      })

      setCity({
        label: city,
        value: city
      })
    }
  }, [user])

  const countries = Object.keys(data_countries)
  const cities = country ? data_countries[country.value] : []

  if (!type) {
    return (
      <FlatList
        data={['food', 'invite', 'money', 'physical']}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item}
        ListHeaderComponent={
          <Text style={styles.header}>
            What type of {kind} do you want to create?
          </Text>
        }
        renderItem={({ item }: { item: RequestTypeType }) => (
          <Touchable
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              )

              setType(item)
            }}
            style={styles.item}>
            <Image source={img_types[item]} style={styles.icon} />
            <View style={styles.details}>
              <Text style={styles.type}>{startCase(item)}</Text>
              <Text style={styles.description}>
                Example:{' '}
                {item === 'food'
                  ? "Haven't received your salary yet or unexpected expenses prevent you from buying food or groceries?"
                  : item === 'invite'
                  ? "Need help getting a job interview? Or just moved to a new city and don't know anyone?"
                  : item === 'money'
                  ? 'Need financial help for an unexpected expense?'
                  : 'Moved to a new apartment and need some furniture?'}
              </Text>
            </View>
          </Touchable>
        )}
      />
    )
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.main}
        keyboardShouldPersistTaps="always">
        <Text style={styles.label}>
          Describe your {kind}.{' '}
          {kind === 'offer'
            ? 'Remember to keep it short.'
            : 'Use this to convince others why they should help you. But keep it short.'}
        </Text>
        <TextBox
          multiline
          onChangeText={(description) => setDescription(description)}
          placeholder="Description"
          value={description}
        />
        <Text style={styles.label}>Where are you located?</Text>
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
      <Button
        label={`Create ${kind}`}
        loading={loading}
        onPress={() => {
          if (onUpdate && item && description) {
            onUpdate(item.id, description)
          } else if (onCreate && description && country && city) {
            onCreate({
              city: city.value,
              country: country.value,
              description,
              type
            })
          }
        }}
        style={styles.button}
      />
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: layout.margin
  },
  description: {
    ...typography.footnote,
    color: colors.foreground,
    marginTop: layout.padding
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  header: {
    ...typography.paragraph,
    color: colors.foreground,
    padding: layout.margin
  },
  icon: {
    height: layout.icon * 3,
    width: layout.icon * 3
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  label: {
    ...typography.paragraph,
    color: colors.foreground,
    marginBottom: layout.padding,
    marginTop: layout.margin
  },
  main: {
    paddingHorizontal: layout.margin
  },
  picker: {
    marginTop: layout.padding
  },
  type: {
    ...typography.subtitle,
    color: colors.primary
  }
})
