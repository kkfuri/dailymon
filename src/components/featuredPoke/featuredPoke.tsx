import Image from 'next/image'
import chroma from 'chroma-js'
import { CgPokemon } from 'react-icons/cg'
import { AiOutlineNumber } from 'react-icons/ai'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'

import { colorByType } from 'src/utils/constants'
import { Stats } from '../stats/stats'

const backgroundWithImage = (color, image) => ({
  backgroundImage: `url(${image}), linear-gradient(150deg, ${chroma(color)
    .brighten(0.8)
    .css()}, ${color})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center ,center',
  backgroundSize: '320px, cover',
  backgroundBlendMode: 'soft-light',
})

export const FeaturedPoke: React.FC<PokemonAttrs> = ({
  id,
  types,
  sprites,
  name,
  stats,
  height,
  weight,
}) => {
  const number = id ? id.toString().padStart(3, '0') : null
  const formattedTypes = types?.map((i) => i.type.name)
  const pokeColor = colorByType[formattedTypes?.[0]] || 'white'
  return (
    <Flex>
      <Box
        position="relative"
        role="group"
        mr={4}
        h={390}
        w={{ base: 240, lg: 480 }}
        {...backgroundWithImage(
          pokeColor,
          sprites?.other?.['official-artwork']?.front_default
        )}
        borderRadius={12}
        p={3}
        transition="background-size .4s"
        _hover={{
          backgroundSize: '460px, cover',
        }}
      >
        <Stack isInline spacing={2}>
          {formattedTypes?.map((type) => (
            <Box
              color={colorByType[type]}
              bg={chroma(colorByType[type]).brighten().hex()}
              borderRadius={4}
              boxShadow="sm"
              px={2}
              fontWeight="bold"
              fontSize="xs"
              textTransform="uppercase"
            >
              {type}
            </Box>
          ))}
        </Stack>
        <Box
          mt={8}
          textAlign="center"
          color={chroma(pokeColor).darken().hex()}
          transition="color .4s"
          _groupHover={{ color: chroma(pokeColor).darken(3).hex() }}
        >
          {id && (
            <Heading as="h3" size="4xl" ml={1}>
              #{number}
            </Heading>
          )}
          <Heading
            as="h1"
            position="absolute"
            borderRadius="0 0 12px 12px"
            inset={0}
            top="auto"
            size="3xl"
            fontWeight="normal"
            textTransform="capitalize"
            py={4}
            bg={chroma(pokeColor).brighten(2).alpha(0.2).css()}
          >
            {name}
          </Heading>
        </Box>
        <Box
          position="absolute"
          top={-8}
          right={-10}
          zIndex={10}
          transition="transform .4s"
          _groupHover={{ transform: 'scale(1.1)' }}
        >
          {sprites && (
            <>
              <Image
                src={sprites?.front_default}
                width={116}
                height={116}
                quality={100}
              />
            </>
          )}
        </Box>
      </Box>
      <Stack spacing={4}>
        <Stats
          title="Pokédex data"
          list={[
            { title: 'nº.', value: number },
            { title: 'Height', value: `${height / 10}m` },
            { title: 'Weight', value: `${weight / 10}kg` },
          ]}
          color={pokeColor}
          IconAs={AiOutlineNumber}
        />
        <Stats
          title="Stats"
          list={stats.map((i) => ({ title: i.stat.name, value: i.base_stat }))}
          color={pokeColor}
          IconAs={CgPokemon}
        />
      </Stack>
    </Flex>
  )
}
