import Image from 'next/image'
import { Badge, Box, Flex, Heading, Skeleton, Spinner, Stack, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import chroma from 'chroma-js'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isToday from 'dayjs/plugin/isToday'
import Link from 'next/link'

import { TypeTag } from '@/components'
import { generateAverageColor, generateMainColor } from '@/utils/colors'
import api from '@/utils/api'

dayjs.extend(relativeTime)
dayjs.extend(isToday)

async function getPokemon(id: number): Promise<PokemonAttrs> {
  return await api.get(`/pokemon/${id}`).then((res) => res.data)
}

interface CalendarCardProps {
  id: number,
  date: dayjs.Dayjs
  hide: boolean
}

export const CalendarCard = ({ id: pokeId, date, hide }: CalendarCardProps) => {
  const { data } = useQuery<PokemonAttrs, Error>(pokeId, () => getPokemon(pokeId), { enabled: !hide })

  const { id, name, types, sprites } = data || {}
  const number = id ? id.toString().padStart(3, '0') : null
  const formattedTypes = types?.map((i) => i.type.name)

  const mainColor = chroma(generateMainColor(formattedTypes?.[0], { randomDefault: true })).brighten(hide && 2).hex()
  const avgColor = hide ? chroma(mainColor).brighten().hex() : generateAverageColor(formattedTypes)

  const backgroundImage = hide ? 'url()' : `url(${sprites?.other?.['official-artwork']?.front_default
    })`
  const backgroundColor = `linear-gradient(150deg, ${chroma(avgColor).brighten(2).css()}, ${chroma(mainColor).brighten().css()})`

  return (
    <Link href={id ? `/${id}` : '/'} passHref>
      <Box
        as="a"
        position="relative"
        role="group"
        w="100%"
        maxW={195}
        h={180}
        backgroundImage={[backgroundImage, backgroundColor].join(', ')}
        backgroundRepeat="no-repeat"
        backgroundPosition="80% 20%, center"
        backgroundSize="80px, cover"
        backgroundBlendMode="soft-light"
        border="1px solid gray"
        p={3}
      >
        {dayjs(date).isToday() && (
          <Badge variant="outline" position="absolute" right={2} top={2}>Today</Badge>
        )}
        <Flex direction="column" alignItems="center" mt={2} fontSize="large" lineHeight="none" color={chroma(mainColor).darken(2).css()}>
          <Text>{date.format('ddd')}.</Text>
          <Text>{date.format('DD')}</Text>
        </Flex>
        <Skeleton
          isLoaded={hide || !!id}
          startColor={mainColor}
          endColor={chroma(mainColor).brighten().css()}
        >
          <Flex
            direction="column"
            alignItems="center"
            h="72px"
            mt={2}
            ml={6}
            color={chroma(mainColor).darken().hex()}
            transition="color .4s"
            _groupHover={{
              color: hide ? chroma(mainColor).darken(3).hex() : chroma(mainColor).darken(4).hex()
            }}
          >
            {hide ? (
              <Heading size="3xl" position="absolute" left="45%" top="40%" zIndex={10}>
                ?
              </Heading>
            ) : (
              <>
                <Heading
                  as="h1"
                  size="lg"
                  maxH="60px"
                  overflow="hidden"
                  fontWeight="normal"
                  textTransform="capitalize"
                  transition="letter-spacing .4s"
                  cursor="unset"
                  _groupHover={{ letterSpacing: 'wide' }}
                  hidden={hide}
                >
                  {name}
                </Heading>
                <Heading as="h3" size={hide ? "3xl" : "xl"} ml={14} cursor="unset">
                  #{number}
                </Heading>
              </>
            )}
          </Flex>
        </Skeleton>
        <Box
          position="absolute"
          top={20}
          left={2}
          zIndex={10}
          transition="transform .4s"
          pointerEvents="none"
          _groupHover={!hide && { transform: 'scale(1.1)' }}
          filter={hide && 'blur(12px)'}
        >
          {sprites?.front_default && (
            <Image
              src={sprites?.front_default}
              width={88}
              height={88}
              quality={100}
            />
          )}

          {!id && (
            <Flex boxSize={116} alignItems="center" justifyContent="center">
              <Spinner
                size="lg"
                thickness="4px"
                color={chroma(mainColor).brighten().css()}
              />
            </Flex>
          )}
        </Box>
        {hide ? (
          <Text textAlign="center" color={chroma(mainColor).darken(2).hex()}>
            {dayjs(dayjs()).to(date)}
          </Text>
        ) : (
          <Stack isInline spacing={2} h={5} mb={2} position="absolute" bottom={0} right={1}>
            {formattedTypes
              ? formattedTypes.map((type) => <TypeTag key={type} type={type} />)
              : new Array(2)
                .fill(true)
                .map((_, index) => (
                  <Skeleton
                    key={`skeleton-${index}`}
                    boxShadow="md"
                    startColor={mainColor}
                    endColor={hide ? mainColor : chroma(mainColor).brighten().css()}
                    width="48px"
                  />
                ))}
          </Stack>
        )}
      </Box>
    </Link>
  )
}
