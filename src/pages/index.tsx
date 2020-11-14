import { useQuery } from 'react-query'
import api from 'src/utils/api'

export default function Home() {
  const { data, isLoading, isError } = useQuery('allPokemons', () =>
    api.get('pokemon?limit=12')
  )
  return (
    <div>
      <img src="./logo.png" />
    </div>
  )
}
