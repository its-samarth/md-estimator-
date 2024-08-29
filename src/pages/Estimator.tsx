import React from 'react'
import RoughData from '../components/EstimatorTable'
import RoughtTable from '../components/RoughTable'
import TrialComponent from '../components/Trial'

function Estimator() {
  return (
    <div>
        <RoughData/>
        <TrialComponent/>
        <RoughtTable/>
    </div>
  )
}

export default Estimator