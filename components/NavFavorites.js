import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street, London, UK"
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London, UK"
  }
]

const NavFavorites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item: { location, destination, icon } }) => {
        <TouchableOpacity>
          <Icon
            style={tw`mr-4 rounded-full bg-gra-300 p-3`}
            name={icon}
            type="ionicon"
            color="wite"
            size={18}
          />
        </TouchableOpacity>
      }}
    />
  )
}

export default NavFavorites

const styles = StyleSheet.create({})