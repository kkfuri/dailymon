import { Box, Flex } from '@chakra-ui/react'
import { FaQuestion, FaQuestionCircle } from 'react-icons/fa'

const backgroundWithImage = (image) => ({
  backgroundImage: `url(${image})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center ,center',
  backgroundSize: '240px, cover',
})

export const WhosThatPokemon: React.FC<PokemonAttrs> = ({ sprites }) => {
  return (
    <Flex
      flexDir="column"
      minH={280}
      role="group"
      position="relative"
      justifyContent="center"
      height="full"
    >
      <Box
        role="group"
        h={280}
        w="full"
        {...backgroundWithImage(
          sprites?.other?.['official-artwork']?.front_default
        )}
        borderRadius={12}
        p={3}
        transition="background-size .4s"
        _groupHover={{ backgroundSize: '320px, cover' }}
        style={{ filter: 'brightness(0)' }}
      />

      <Box position="absolute" top="35%" right="20%">
        <Box
          position="relative"
          bg="black"
          w="80px"
          h="80px"
          rounded="full"
          transition=".4s"
          _groupHover={{ w: 90, h: 90 }}
        >
          <Box
            position="relative"
            top={3}
            left={3}
            color="white"
            fontSize="4rem"
            transition=".4s"
            _groupHover={{ fontSize: '5rem', top: 3, left: 3 }}
          >
            <FaQuestion />
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}
