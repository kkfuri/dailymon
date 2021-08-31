import { useState } from 'react'
import dayjs from 'dayjs'
import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import Head from 'next/head'

import { CalendarCard } from '@/components'
import { getPastPokemons } from '@/utils/history'

export default function Past({ pastPokemons }) {
  const [year, setYear] = useState<number | null>(dayjs().subtract(1, 'day').year())
  const [month, setMonth] = useState<number | null>(dayjs().subtract(1, 'day').month() + 1)
  const years = Object.keys(pastPokemons).map(i => Number(i)).filter(i => i <= dayjs().year())

  function handleClickYear(y) {
    setYear(y)
  }

  function handleClickMonth(m) {
    setMonth(m)
  }

  const pokemonsFromThisDate: { [key: number]: number } | null = year ?? month ? pastPokemons[year][month] : null

  const isPokemonHidden = (day: number) => year === dayjs().year() && month > (dayjs().month() + 1) || year === dayjs().year() && month === (dayjs().month() + 1) && day > dayjs().date()
  const fullDate = (day: string) => dayjs([month, day, year].join('/'))

  return (
    <>
      <Head>
        <title>Dailymon - every day a new pokemon</title>
      </Head>
      <Flex flexDir="column" my={12}>
        <SimpleGrid
          columns={years.length}
          spacing={6}
          maxW={1240}
          mx="auto"
          py={4}
        >
          {years.map(possibleYear => (
            <Button
              key={possibleYear}
              isActive={possibleYear === year}
              _active={{
                background: 'var(--chakra-colors-blue-400)',
                color: 'white'
              }}
              onClick={() => handleClickYear(possibleYear)}
            >
              {possibleYear}
            </Button>
          ))}
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 3, md: 6 }}
          spacing={2}
          maxW={1240}
          mx="auto"
          py={2}
        >
          {year && Array.from({ length: 12 }, (_, i) => i + 1).map(possibleMonth => (
            <Button
              key={possibleMonth}
              size="sm"
              isActive={month === possibleMonth}
              _active={{
                background: 'var(--chakra-colors-blue-400)',
                color: 'white'
              }}
              onClick={() => handleClickMonth(possibleMonth)}>
              {dayjs().month(possibleMonth - 1).format('MMMM')}
            </Button>
          ))}
        </SimpleGrid>
        <SimpleGrid
          columns={7}
          maxW={1240}
          w="100%"
          mx="auto"
          py={6}
        >
          {(year && month) &&
            Object.keys(pokemonsFromThisDate).map((key) => (
              <CalendarCard
                key={key}
                id={pokemonsFromThisDate[key]}
                date={fullDate(key)}
                hide={isPokemonHidden(Number(key))} />
            ))}
        </SimpleGrid>
      </Flex>
    </>
  )
}

export async function getStaticProps(ctx) {
  const pastPokemons = getPastPokemons()

  return {
    props: {
      pastPokemons
    },
  }
}
