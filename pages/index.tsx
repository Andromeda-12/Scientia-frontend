import type { NextPage } from 'next'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

const Home: NextPage = () => {
  return (
    <div>
      <main>Hello</main>

      <footer></footer>
    </div>
  )
}

export const getServerSideProps = withCheckServerSideAuth()

export default Home
