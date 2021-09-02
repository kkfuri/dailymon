import Image from 'next/image'
import chroma from 'chroma-js'
import { CgPokemon } from 'react-icons/cg'
import { AiOutlineNumber } from 'react-icons/ai'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'

import { generateMainColor, generateAverageColor } from '@/utils/colors'
import { Stats, EvolutionList, TypeTag } from '@/components'

const backgroundWithImage = (color, avgColor, image) => ({
  backgroundImage: `url(${image}), linear-gradient(150deg, ${chroma(avgColor)
    .brighten(0.6)
    .css()}, ${color})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center ,center',
  backgroundSize: '240px, cover',
})

export const FeaturedPokemon: React.FC<PokemonAttrs> = ({
  id,
  types,
  sprites,
  name,
  stats,
  species,
  height,
  weight,
}) => {
  const number = id ? id.toString().padStart(3, '0') : null
  const formattedTypes = types?.map((i) => i.type.name)
  const mainColor = generateMainColor(formattedTypes)
  const avgColor = generateAverageColor(formattedTypes)

  return (
    <Flex flexDir="column" minH={390} w="full">
      <Stack
        spacing={4}
        mb={4}
        w="full"
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ xs: 'center', md: 'unset' }}
      >
        <Box
          position="relative"
          role="group"
          h={390}
          w="full"
          {...backgroundWithImage(
            mainColor,
            avgColor,
            sprites?.other?.['official-artwork']?.front_default
          )}
          borderRadius={12}
          p={3}
          transition="background-size .4s"
          _hover={{
            backgroundSize: '320px, cover',
          }}
        >
          <Stack isInline spacing={2} position="absolute" zIndex={10}>
            {formattedTypes?.map((type) => (
              <TypeTag key={type} type={type} />
            ))}
          </Stack>
          <Box
            textAlign="center"
            color={
              chroma.contrast('white', mainColor) > 4.5
                ? chroma(mainColor).brighten(1.6).css()
                : chroma(mainColor).darken(1.6).css()
            }
            transition="color .4s"
            _groupHover={{
              color:
                chroma.contrast('white', mainColor) > 4.5
                  ? chroma(mainColor).brighten(3).css()
                  : chroma(mainColor).darken(3).css(),
            }}
          >
            <Heading as="h3" fontSize={{ base: '48px', md: '80px' }} ml={1}>
              #{number ?? '~~~'}
            </Heading>
            <Heading
              as="h1"
              position="absolute"
              borderRadius="0 0 12px 12px"
              inset={0}
              top="auto"
              minH="100px"
              fontSize={{ base: '36px', md: '60px' }}
              fontWeight="normal"
              textTransform="capitalize"
              isTruncated
              py={4}
              bg={
                chroma.contrast('white', mainColor) <= 4.5
                  ? chroma(mainColor).brighten(2).alpha(0.2).css()
                  : chroma(mainColor).darken(2).alpha(0.2).css()
              }
            >
              {name}
            </Heading>
          </Box>
          <Box
            position="absolute"
            top={-8}
            right={-8}
            zIndex={10}
            transition="transform .4s"
            _groupHover={{ transform: 'scale(1.1)' }}
            pointerEvents="none"
          >
            {sprites && (
              <Image
                src={sprites?.front_default}
                width={116}
                height={116}
                quality={100}
              />
            )}
          </Box>
        </Box>
        <Stack spacing={4} w="full" maxW={{ md: 180 }}>
          <Stats
            title="Pokédex data"
            list={[
              { title: 'nº.', value: number ?? '?' },
              { title: 'Height', value: height ? `${height / 10}m` : '?' },
              { title: 'Weight', value: weight ? `${weight / 10}kg` : '?' },
            ]}
            color={mainColor}
            IconAs={AiOutlineNumber}
          />
          <Stats
            title="Stats"
            list={
              stats
                ? stats.map((i) => ({
                  title: i.stat.name,
                  value: i.base_stat,
                }))
                : []
            }
            color={mainColor}
            IconAs={CgPokemon}
          />
        </Stack>
      </Stack>
      {species && <EvolutionList url={species.url} />}
    </Flex>
  )
}
