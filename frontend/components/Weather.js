import React, { Component } from 'react'
import styled from 'styled-components'
import { Text, Box, Flex, Subhead, Small } from 'rebass'
import { round } from 'lodash'
import Card from './Card'
import Icon from './Icon'
import colors from './colors'
import fetch from 'unfetch'

const WEATHER_API =
  'https://earthnetworks.azure-api.net/data/observations/v4/current?&stationid=UPAEN&providerid=3&units=english&cultureinfo=en-en&verbose=true&ruledetails=true&verbose=true&metadata=true%20&includeqcflags=true&subscription-key=45ba7fa489cc472d8282b87d1ec04f18'

const Heading = styled(Box).attrs({ pb: 1 })`
  border-bottom: 1px dotted ${colors.smoke};
`

const Unit = styled.small`
  font-size: 0.66em;
  line-height: 1.2;
  vertical-align: top;
`

const Label = props => <Small f={2} color={colors.grey} ml={1} {...props} />

const icon = a => {
  const sunny = <Icon name="wb_sunny" fill="#f8b700" />
  const cloudy = <Icon name="cloud" fill={colors.grey} />
  return /cloud/.test(a) ? cloudy : sunny
}

class Weather extends Component {
  constructor() {
    super()
    this.state = {
      temperature: '',
      temperatureHigh: '',
      temperatureLow: '',
      condition: ''
    }
  }

  componentDidMount() {
    this.fetchWeather()
  }

  fetchWeather() {
    fetch(WEATHER_API)
      .then(res => res.json())
      .then(data => {
        const { temperature, IconDescription } = data.observation
        const { temperatureLow, temperatureHigh } = data.highlow
        this.setState({
          temperature,
          temperatureHigh,
          temperatureLow,
          condition: IconDescription
        })
      })
  }

  render() {
    const {
      temperature,
      temperatureHigh,
      temperatureLow,
      condition
    } = this.state
    return (
      <Card w={1} mt={0}>
        <Heading>
          <Subhead mt={0} f={3} caps>
            Weather
          </Subhead>
          <Flex align="center">
            <Icon name="pin" size={16} fill={colors.grey} />
            <Text color={colors.grey} ml={1}>
              University of Pennsylvania
            </Text>
          </Flex>
        </Heading>
        <Flex align="center" mt={2} style={{ lineHeight: '1' }}>
          {icon(condition)}
          <Text f={6} mx={2}>
            {round(temperature)}
            <Unit>ºF</Unit>
          </Text>
          <Box>
            <Text mb={1}>
              {round(temperatureHigh)}º
              <Label>↑</Label>
            </Text>
            <Text>
              {round(temperatureLow)}º
              <Label>↓</Label>
            </Text>
          </Box>
        </Flex>
      </Card>
    )
  }
}

export default Weather
