import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import Head from 'next/head'

import { CalendarCard } from '@/components'
import { getPastPokemons } from '@/utils/history'
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg'

export default function Past({ pastPokemons }) {
  const yesterday = dayjs().subtract(1, 'day')
  const [year, setYear] = useState<number>(yesterday.year())
  const [month, setMonth] = useState<number>(yesterday.month() + 1)
  const years = Object.keys(pastPokemons).map(i => Number(i)).filter(i => i <= dayjs().year())

  const pokemons = useMemo(() => pastPokemons[year][month], [year, month])

  // Pokemon should be hidden when it's date has not past yet
  const isPokemonHidden = (day: number) => year === dayjs().year() && month > (dayjs().month() + 1) || year === dayjs().year() && month === (dayjs().month() + 1) && day > dayjs().date()

  function handlePastMonth() {
    setMonth(m => m === 1 ? 12 : m - 1)
    if (month === 1) {
      setYear(y => y - 1)
    }
  }

  function handleNextMonth() {
    setMonth(m => m === 12 ? 1 : m + 1)
    if (month === 12 && years[years.length - 1] !== year) {
      setYear(y => y + 1)
    }
  }

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
              onClick={() => setYear(possibleYear)}
            >
              {possibleYear}
            </Button>
          ))}
        </SimpleGrid>
        <Flex justifyContent="center" alignItems="center">
          <Button
            onClick={handlePastMonth}
            isDisabled={month === 1 && year === years[0]}
          >
            <CgArrowLeft style={{ cursor: 'pointer' }} size="2.8rem" />
          </Button>
          <SimpleGrid
            columns={{ base: 3, md: 6 }}
            spacing={2}
            maxW={1240}
            mx={4}
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
                onClick={() => setMonth(possibleMonth)}>
                {dayjs().month(possibleMonth - 1).format('MMMM')}
              </Button>
            ))}
          </SimpleGrid>
          <Button
            onClick={handleNextMonth}
            isDisabled={month === 12 && year === years[years.length - 1]}
          >
            <CgArrowRight style={{ cursor: 'pointer' }} size="2.8rem" />
          </Button>
        </Flex>
        <SimpleGrid
          columns={{ base: 1, md: 7 }}
          justifyContent="center"
          maxW={1240}
          w="100%"
          mx="auto"
          py={6}
        >
          {Object.keys(pokemons).map((key) => (
            <CalendarCard
              key={key}
              id={pokemons[key]}
              date={dayjs([month, key, year].join('/'))}
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
