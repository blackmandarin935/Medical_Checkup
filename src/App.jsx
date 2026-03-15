import { useMemo, useState } from 'react'
import bodyImg from './assets/body-realistic.svg'
import './App.css'

const diseases = [
  {
    id: 'gastritis',
    name: '급성 위염',
    region: 'stomach',
    symptoms: ['명치 통증', '속 쓰림', '구역감', '식욕 저하', '복부 팽만'],
    treatments: ['위산 억제제', '식이 조절', '수액 보충'],
    prevention: ['자극적 음식 줄이기', '규칙적인 식사', '과음 피하기'],
    progression: [
      '위 점막 자극과 염증 시작',
      '통증 및 소화불량 악화',
      '구토, 탈수로 전신 증상 동반',
    ],
  },
  {
    id: 'pneumonia',
    name: '폐렴',
    region: 'lung',
    symptoms: ['발열', '기침', '가래', '호흡 곤란', '흉통'],
    treatments: ['항생제', '산소 치료', '수분 섭취'],
    prevention: ['예방 접종', '손 씻기', '충분한 휴식'],
    progression: [
      '감염 후 폐포 염증 진행',
      '기침, 가래 증가',
      '호흡 저하와 흉통 발생',
    ],
  },
  {
    id: 'arthritis',
    name: '무릎관절염',
    region: 'knee',
    symptoms: ['관절 통증', '붓기', '운동 제한', '걷기 불편', '열감'],
    treatments: ['소염 진통제', '물리 치료', '근력 강화 운동'],
    prevention: ['체중 관리', '무릎 부담 줄이기', '스트레칭'],
    progression: [
      '연골 마모 시작',
      '염증 및 통증 증가',
      '관절 기능 저하와 변형',
    ],
  },
]

const ageRanges = ['0-12', '13-24', '25-39', '40-59', '60+']

function App() {
  const [searchMode, setSearchMode] = useState('disease')
  const [query, setQuery] = useState('')
  const [selectedDiseaseId, setSelectedDiseaseId] = useState('')
  const [selectedSymptomId, setSelectedSymptomId] = useState('')
  const [gender, setGender] = useState('')
  const [ageRange, setAgeRange] = useState('')

  const symptoms = useMemo(() => {
    const set = new Set()
    diseases.forEach((disease) => {
      disease.symptoms.forEach((symptom) => set.add(symptom))
    })
    return Array.from(set).map((symptom) => ({ id: symptom, name: symptom }))
  }, [])

  const filteredDiseases = diseases.filter((disease) =>
    disease.name.includes(query)
  )
  const filteredSymptoms = symptoms.filter((symptom) =>
    symptom.name.includes(query)
  )

  const selectedDisease = diseases.find((disease) => disease.id === selectedDiseaseId)

  const relatedDiseases = useMemo(() => {
    if (!selectedSymptomId) return []
    return diseases.filter((disease) =>
      disease.symptoms.includes(selectedSymptomId)
    )
  }, [selectedSymptomId])

  const focusedDisease = useMemo(() => {
    if (searchMode === 'disease') return selectedDisease
    if (selectedDiseaseId) {
      return diseases.find((disease) => disease.id === selectedDiseaseId)
    }
    return relatedDiseases[0]
  }, [searchMode, selectedDiseaseId, selectedDisease, relatedDiseases])

  const activeRegions = useMemo(() => {
    if (searchMode === 'disease' && selectedDisease) {
      return [selectedDisease.region]
    }
    if (searchMode === 'symptom' && relatedDiseases.length > 0) {
      return Array.from(new Set(relatedDiseases.map((disease) => disease.region)))
    }
    return []
  }, [searchMode, selectedDisease, relatedDiseases])

  const rightPanelTitle = searchMode === 'disease' ? '증상' : '질환'
  const leftPanelTitle = searchMode === 'disease' ? '질환' : '증상'

  return (
    <div className="app">
      <header className="top-bar">
        <div>
          <p className="eyebrow">Medical Checkup Simulator</p>
          <h1>건강 진단 시뮬레이터</h1>
          <p className="subtitle">
            질환-증상 관계를 탐색하고 인체 부위를 시각적으로 확인하세요.
          </p>
        </div>
      </header>

      <main className="layout">
        <section className="panel left-panel">
          <div className="panel-header">
            <div className="panel-header-row">
              <h2>{leftPanelTitle}</h2>
              <div className="mode-toggle">
                <span>질환 검색</span>
                <button
                  className={`switch ${searchMode === 'symptom' ? 'active' : ''}`}
                  onClick={() => {
                    const nextMode = searchMode === 'disease' ? 'symptom' : 'disease'
                    setSearchMode(nextMode)
                    setQuery('')
                    setSelectedSymptomId('')
                    if (nextMode === 'disease') {
                      setSelectedDiseaseId('')
                    }
                  }}
                >
                  <span className="knob" />
                </button>
                <span>증상 검색</span>
              </div>
            </div>
            <p>검색 후 선택하면 상세가 업데이트됩니다.</p>
          </div>
          <label className="search">
            <span>검색</span>
            <input
              type="text"
              placeholder={`${leftPanelTitle} 검색`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="list">
            {(searchMode === 'disease' ? filteredDiseases : filteredSymptoms).map(
              (item) => (
                <button
                  key={item.id}
                  className={`list-item ${
                    searchMode === 'disease'
                      ? item.id === selectedDiseaseId
                        ? 'active'
                        : ''
                      : item.id === selectedSymptomId
                        ? 'active'
                        : ''
                  }`}
                  onClick={() => {
                    if (searchMode === 'disease') {
                      setSelectedDiseaseId(item.id)
                      setSelectedSymptomId('')
                    } else {
                      setSelectedSymptomId(item.id)
                      setSelectedDiseaseId('')
                    }
                  }}
                >
                  <span>{item.name}</span>
                  <span className="badge">선택</span>
                </button>
              )
            )}
          </div>
        </section>

        <section className="center-panel">
          <div className="model-card">
            <div className="model-header">
              <h2>인체 모형</h2>
              <p>선택된 항목과 관련된 부위가 강조됩니다.</p>
            </div>

            <div className="model-stage">
              <div className="body">
                <img className="body-image" src={bodyImg} alt="인체 모형" />
                <div className={`region stomach ${activeRegions.includes('stomach') ? 'active' : ''}`}>
                  위
                </div>
                <div className={`region lung ${activeRegions.includes('lung') ? 'active' : ''}`}>
                  폐
                </div>
                <div className={`region knee ${activeRegions.includes('knee') ? 'active' : ''}`}>
                  무릎
                </div>
              </div>
              <div className="side-controls">
                <div className="control-card">
                  <p>개인 변수</p>
                  <div className="chips">
            {['전체', '남성', '여성'].map((label) => (
              <button
                key={label}
                className={`chip ${gender === label ? 'active' : ''}`}
                onClick={() => setGender(label)}
              >
                {label}
              </button>
            ))}
                  </div>
                  <div className="age-grid">
                    {ageRanges.map((range) => (
                      <button
                        key={range}
                        className={`age ${ageRange === range ? 'active' : ''}`}
                        onClick={() => setAgeRange(range)}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="zoom-card">
                  <h3>확대 분석</h3>
                  <p>{focusedDisease?.name || '항목을 선택하세요.'}</p>
                  <ul>
                    {(focusedDisease?.progression || []).map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="panel right-panel">
          <div className="panel-header">
            <h2>{rightPanelTitle}</h2>
            <p>선택 결과가 여기 표시됩니다.</p>
          </div>

          <div className="list">
            {searchMode === 'disease' && selectedDisease ? (
              selectedDisease.symptoms.map((symptom) => (
                <div key={symptom} className="list-item static">
                  <span>{symptom}</span>
                  <span className="tag">증상</span>
                </div>
              ))
            ) : relatedDiseases.length > 0 ? (
              relatedDiseases.map((disease) => (
                <button
                  key={disease.id}
                  className={`list-item ${
                    disease.id === focusedDisease?.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedDiseaseId(disease.id)}
                >
                  <span>{disease.name}</span>
                  <span className="badge">관련</span>
                </button>
              ))
            ) : (
              <div className="empty">검색 결과가 없습니다.</div>
            )}
          </div>

          <div className="divider" />

          <div className="care">
            <div>
              <h3>치료법</h3>
              <ul>
                {(focusedDisease?.treatments || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>예방법</h3>
              <ul>
                {(focusedDisease?.prevention || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
