import {
  Program,
  AnchorProvider,
  setProvider,
  utils,
  BN,
} from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

import { Nirvana } from '../target/types/nirvana'
import idl from '../target/idl/nirvana.json'

const programId = 'nirkXSE28jCQoK8SmKWqxXz3L9vbSRGKS24iYJj8Aeo'
const nirv_center = 'NNNDj6CgMZbTiJmkvmK2TZwTThXgNWZrCk5bvL9f6Ee'
const price_field_pda = 'BVVSjMb7evw5pWQaByRKpLjQerKVgVgCP8mh1PuALJF2'

describe('nirvana', () => {
  // Configure the client to use the local cluster.
  const provider = AnchorProvider.env()
  setProvider(provider)

  const program = new Program<Nirvana>(
    idl as unknown as Nirvana,
    programId,
    provider
  )

  const seeds = [
    Buffer.from(utils.bytes.utf8.encode('pf2')),
    new PublicKey(nirv_center).toBuffer(),
  ]

  it('price field', async () => {
    const [price_field] = await PublicKey.findProgramAddress(
      seeds,
      program.programId
    )

    const state = await program.account.priceFieldV2.fetch(price_field)

    for (const i in state) {
      if (i != 'nirvCenter' && i != 'bump') {
        console.log(i, new BN(state[i]).toString())
      }
    }
  })
})
