import { Box, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import chroma from 'chroma-js'
import { IconType } from 'react-icons'

const ContrastText = ({ children, color }) => {
  return (
    <Text
      textTransform="uppercase"
      color={
        chroma.contrast('white', color) > 4.5
          ? chroma(color).brighten(3).css()
          : chroma(color).darken(3).css()
      }
      letterSpacing="wide"
    >
      {children}
    </Text>
  )
}

interface StatsProps {
  color: string
  title: string
  list: { title: string; value: string | number }[]
  IconAs: IconType
}

export const Stats: React.FC<StatsProps> = ({ color, title, IconAs, list }) => {
  return (
    <Box
      role="group"
      bg={`linear-gradient(300deg, ${chroma(color)
        .brighten()
        .css()}, ${color})`}
      borderRadius={12}
      p={2}
      h="full"
    >
      <Flex
        alignItems="center"
        color={
          chroma.contrast('white', color) > 4.5
            ? chroma(color).brighten(3).css()
            : chroma(color).darken(3).css()
        }
      >
        {IconAs && (
          <Flex alignItems="center" justifyContent="center" boxSize={8}>
            <Icon
              as={IconAs}
              mr={1}
              boxSize={6}
              transition=".3s"
              _groupHover={{ boxSize: 8 }}
            />
          </Flex>
        )}
        <Heading fontSize={{ base: 'lg', md: 'xl' }}>{title}</Heading>
      </Flex>
      <Stack spacing={0}>
        {list.map(({ title, value }) => (
          <ContrastText color={color}>
            {title} <strong>{value}</strong>
          </ContrastText>
        ))}
      </Stack>
    </Box>
  )
}
