import React from 'react'
import RoughData from '../components/EstimatorTable'
import RoughtTable from '../components/RoughTable'
import TrialComponent from '../components/Trial'
import MainTable from '../Estimator components/MainTable'
import Trial from '../components/Trial'

function Estimator() {
  return (
    <div>
        
        {/*
        <RoughData/>
        <MainTable/>
        <TrialComponent/>
        */}
        <Trial/>
        
        <RoughtTable/>
    </div>
  )
}

export default Estimator