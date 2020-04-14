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

import { types } from '../../assets'
import { data_countries } from '../../data'
import { useAuth } from '../../hooks'
import { colors, layout, typography } from '../../styles'
import {
  PickerItemType,
  RequestInputType,
  RequestType,
  RequestTypeType
} from '../../types'
import { Button, Picker, Separator, TextBox, Touchable } from '../common'

interface Props {
  request?: RequestType
  loading: boolean

  onCreate?: (data: RequestInputType) => void
  onUpdate?: (id: string, description: string) => void
}

export const Form: FunctionComponent<Props> = ({
  loading,
  onCreate,
  onUpdate,
  request
}) => {
  const { user } = useAuth()

  const [description, setDescription] = useState(
    request ? request.description : ''
  )
  const [type, setType] = useState<RequestTypeType | undefined>(request?.type)
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
          <View style={styles.header}>
            <Text style={styles.title}>
              What type of request do you want to create?
            </Text>
          </View>
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
            <Image source={types[item]} style={styles.icon} />
            <View style={styles.details}>
              <Text style={styles.type}>{startCase(item)}</Text>
              <Text style={styles.description}>
                Example:{' '}
                {item === 'food'
                  ? "Haven't received your salary yet? Unexpected expenses prevent you from buying food or groceries?"
                  : type === 'invite'
                  ? "Need help getting a job interview? Or just moved to a new city and don't know anyone?"
                  : type === 'money'
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
          Describe your request. Use this to convince others why they should
          help you. But keep it short.
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
        label="Create request"
        loading={loading}
        onPress={() => {
          if (onUpdate && request && description) {
            onUpdate(request.id, description)
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
    borderBottomColor: colors.border,
    borderBottomWidth: layout.border * 2
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
  title: {
    ...typography.paragraph,
    color: colors.foreground,
    padding: layout.margin
  },
  type: {
    ...typography.subtitle,
    color: colors.primary
  }
})
