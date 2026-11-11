import React from 'react'

import Expansions from './Expansions'
import Supply from './Supply'
import Language from './Language'

const Settings = () => (
  <React.Fragment>
    <Language />
    <Expansions />
    <Supply />
  </React.Fragment>
)

export default React.memo(Settings)
