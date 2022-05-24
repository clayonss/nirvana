import { Program, AnchorProvider, setProvider } from '@project-serum/anchor'
import { Nirvana } from '../target/types/nirvana'
import idl from '../target/idl/nirvana.json'

const programId = 'nirkXSE28jCQoK8SmKWqxXz3L9vbSRGKS24iYJj8Aeo'

describe('nirvana', () => {
  // Configure the client to use the local cluster.
  const provider = AnchorProvider.env()
  setProvider(provider)

  const program = new Program<Nirvana>(
    idl as unknown as Nirvana,
    programId,
    provider
  )

  it('price field', async () => {})
})
