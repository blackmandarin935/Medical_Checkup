import { useMemo, useState } from 'react'
import bodyImg from './assets/body-realistic-3d.png'
import './App.css'

const diseases = [
  {
    id: 'gastritis',
    name: '급성 위염',
    region: 'stomach',
    symptoms: ['명치 통증', '속 쓰림', '구역감', '식욕 저하', '복부 팽만'],
    treatments: ['위산 억제제', '식이 조절', '수액 보충'],
    prevention: ['자극적 음식 줄이기', '규칙적인 식사', '과음 피하기'],
    progression: ['위 점막 자극과 염증 시작', '통증 및 소화불량 악화', '구토, 탈수 동반'],
  },
  {
    id: 'pneumonia',
    name: '폐렴',
    region: 'lung',
    symptoms: ['발열', '기침', '가래', '호흡 곤란', '흉통'],
    treatments: ['항생제', '산소 치료', '수분 섭취'],
    prevention: ['예방 접종', '손 씻기', '충분한 휴식'],
    progression: ['감염 후 폐포 염증 진행', '기침, 가래 증가', '호흡 저하와 흉통'],
  },
  {
    id: 'hypertension',
    name: '고혈압',
    region: 'heart',
    symptoms: ['두통', '어지럼', '가슴 두근거림', '피로감', '시야 흐림'],
    treatments: ['혈압약', '저염 식단', '유산소 운동'],
    prevention: ['나트륨 줄이기', '체중 관리', '스트레스 관리'],
    progression: ['혈압 상승', '심장 부담 증가', '혈관 손상 위험'],
  },
  {
    id: 'angina',
    name: '협심증',
    region: 'heart',
    symptoms: ['흉통', '왼팔 저림', '호흡 곤란', '식은땀', '피로'],
    treatments: ['항협심증제', '휴식', '생활습관 개선'],
    prevention: ['금연', '지질 관리', '규칙 운동'],
    progression: ['심근 허혈 시작', '흉통 반복', '심근경색 위험'],
  },
  {
    id: 'asthma',
    name: '천식',
    region: 'lung',
    symptoms: ['쌕쌕거림', '기침', '호흡 곤란', '흉부 답답함', '야간 증상'],
    treatments: ['흡입 스테로이드', '기관지 확장제', '알레르기 관리'],
    prevention: ['유발 요인 회피', '실내 공기 관리', '규칙 복약'],
    progression: ['기관지 과민 반응', '발작 반복', '폐기능 저하'],
  },
  {
    id: 'bronchitis',
    name: '기관지염',
    region: 'lung',
    symptoms: ['기침', '가래', '흉부 불편', '미열', '피로'],
    treatments: ['충분한 수분', '진해거담제', '휴식'],
    prevention: ['금연', '감기 예방', '실내 습도 유지'],
    progression: ['기관지 염증', '기침 악화', '호흡 곤란'],
  },
  {
    id: 'migraine',
    name: '편두통',
    region: 'brain',
    symptoms: ['한쪽 두통', '오심', '빛 과민', '소리 과민', '피로'],
    treatments: ['진통제', '트립탄', '휴식'],
    prevention: ['수면 규칙', '카페인 조절', '스트레스 관리'],
    progression: ['전조 증상', '두통 발현', '피로 회복기'],
  },
  {
    id: 'sinusitis',
    name: '부비동염',
    region: 'head',
    symptoms: ['코막힘', '안면 통증', '콧물', '후비루', '미열'],
    treatments: ['비강 스프레이', '항생제', '온찜질'],
    prevention: ['코 세척', '감기 예방', '실내 습도 관리'],
    progression: ['부비동 염증', '압통 증가', '후비루 지속'],
  },
  {
    id: 'conjunctivitis',
    name: '결막염',
    region: 'eye',
    symptoms: ['충혈', '가려움', '눈곱', '이물감', '눈물'],
    treatments: ['항생 점안', '냉찜질', '위생 관리'],
    prevention: ['손 씻기', '렌즈 위생', '눈 비비기 금지'],
    progression: ['눈 충혈', '분비물 증가', '자극감 지속'],
  },
  {
    id: 'otitis',
    name: '중이염',
    region: 'ear',
    symptoms: ['귀 통증', '발열', '먹먹함', '청력 저하', '분비물'],
    treatments: ['항생제', '진통제', '경과 관찰'],
    prevention: ['감기 관리', '귀 자극 피하기', '예방 접종'],
    progression: ['이관 염증', '통증 심화', '청력 저하'],
  },
  {
    id: 'tonsillitis',
    name: '편도염',
    region: 'throat',
    symptoms: ['목 통증', '발열', '삼킴 곤란', '두통', '피로'],
    treatments: ['항생제', '해열제', '수분 섭취'],
    prevention: ['손 씻기', '충분한 수면', '구강 위생'],
    progression: ['편도 붓기', '통증 심화', '열 동반'],
  },
  {
    id: 'reflux',
    name: '위식도역류',
    region: 'stomach',
    symptoms: ['가슴쓰림', '신물', '목 이물감', '기침', '속쓰림'],
    treatments: ['위산 억제제', '식습관 개선', '체중 관리'],
    prevention: ['야식 줄이기', '카페인 제한', '상체 높이기'],
    progression: ['역류 반복', '점막 자극', '만성화'],
  },
  {
    id: 'ulcer',
    name: '위궤양',
    region: 'stomach',
    symptoms: ['상복부 통증', '속쓰림', '구토', '식욕 저하', '체중 감소'],
    treatments: ['위산 억제제', '헬리코박터 치료', '식이 조절'],
    prevention: ['NSAIDs 주의', '금연', '규칙 식사'],
    progression: ['점막 손상', '궤양 확대', '출혈 위험'],
  },
  {
    id: 'ibs',
    name: '과민성대장증후군',
    region: 'intestine',
    symptoms: ['복통', '설사', '변비', '복부 팽만', '가스'],
    treatments: ['식이 조절', '진경제', '스트레스 관리'],
    prevention: ['규칙 식사', '카페인 제한', '수면 관리'],
    progression: ['장운동 이상', '복통 반복', '증상 만성화'],
  },
  {
    id: 'colitis',
    name: '대장염',
    region: 'intestine',
    symptoms: ['복통', '설사', '혈변', '발열', '피로'],
    treatments: ['항염제', '수액', '식이 조절'],
    prevention: ['위생 관리', '자극 음식 제한', '수분 섭취'],
    progression: ['대장 염증', '설사 증가', '탈수 위험'],
  },
  {
    id: 'fatty_liver',
    name: '지방간',
    region: 'liver',
    symptoms: ['피로', '우상복부 불편', '소화불량', '체중 증가', '무증상'],
    treatments: ['체중 감량', '운동', '지질 관리'],
    prevention: ['과음 피하기', '식습관 개선', '운동 습관'],
    progression: ['지방 축적', '염증 동반', '간 기능 저하'],
  },
  {
    id: 'hepatitis',
    name: '간염',
    region: 'liver',
    symptoms: ['피로', '황달', '식욕 저하', '우상복부 통증', '구역감'],
    treatments: ['항바이러스제', '휴식', '영양 보충'],
    prevention: ['예방 접종', '위생 관리', '과음 피하기'],
    progression: ['간세포 염증', '황달 발생', '간 기능 저하'],
  },
  {
    id: 'kidney_stone',
    name: '신장 결석',
    region: 'kidney',
    symptoms: ['옆구리 통증', '혈뇨', '구역감', '빈뇨', '발열'],
    treatments: ['진통제', '수분 섭취', '체외충격파'],
    prevention: ['수분 충분', '염분 제한', '식습관 조절'],
    progression: ['결석 이동', '통증 급증', '요로 자극'],
  },
  {
    id: 'cystitis',
    name: '방광염',
    region: 'pelvis',
    symptoms: ['배뇨통', '빈뇨', '잔뇨감', '혈뇨', '하복부 통증'],
    treatments: ['항생제', '수분 섭취', '휴식'],
    prevention: ['수분 섭취', '위생 관리', '배뇨 참지 않기'],
    progression: ['요로 염증', '통증 증가', '재발 가능'],
  },
  {
    id: 'thyroiditis',
    name: '갑상선염',
    region: 'neck',
    symptoms: ['목 통증', '피로', '두근거림', '열감', '체중 변화'],
    treatments: ['항염제', '베타차단제', '경과 관찰'],
    prevention: ['면역 관리', '스트레스 조절', '정기 검사'],
    progression: ['염증 시작', '호르몬 변동', '기능 저하'],
  },
  {
    id: 'diabetes',
    name: '당뇨병',
    region: 'pancreas',
    symptoms: ['다뇨', '다갈', '피로', '체중 감소', '시야 흐림'],
    treatments: ['혈당 약', '식이 조절', '운동'],
    prevention: ['체중 관리', '균형 식단', '정기 검사'],
    progression: ['혈당 상승', '대사 이상', '합병증 위험'],
  },
  {
    id: 'anemia',
    name: '빈혈',
    region: 'blood',
    symptoms: ['어지럼', '피로', '창백', '두근거림', '집중 저하'],
    treatments: ['철분 보충', '원인 치료', '영양 관리'],
    prevention: ['철분 섭취', '규칙 식사', '정기 검사'],
    progression: ['헤모글로빈 감소', '피로 증가', '활동 저하'],
  },
  {
    id: 'dermatitis',
    name: '피부염',
    region: 'skin',
    symptoms: ['가려움', '발진', '홍반', '각질', '부종'],
    treatments: ['항히스타민', '보습', '국소 스테로이드'],
    prevention: ['자극 회피', '보습 유지', '알레르겐 관리'],
    progression: ['피부 자극', '염증 확대', '재발 반복'],
  },
  {
    id: 'eczema',
    name: '아토피 피부염',
    region: 'skin',
    symptoms: ['심한 가려움', '건조', '발진', '상처', '수면 장애'],
    treatments: ['보습제', '국소 스테로이드', '항히스타민'],
    prevention: ['보습 습관', '자극물 회피', '실내 습도 관리'],
    progression: ['건조 악화', '가려움 증가', '상처 반복'],
  },
  {
    id: 'urticaria',
    name: '두드러기',
    region: 'skin',
    symptoms: ['팽진', '가려움', '붉은 발진', '부종', '열감'],
    treatments: ['항히스타민', '냉찜질', '원인 회피'],
    prevention: ['알레르겐 회피', '약물 확인', '스트레스 관리'],
    progression: ['피부 부종', '발진 확산', '재발 가능'],
  },
  {
    id: 'lumbar_pain',
    name: '요통',
    region: 'spine',
    symptoms: ['허리 통증', '자세 불편', '근육 뻣뻣함', '움직임 제한', '피로'],
    treatments: ['스트레칭', '진통제', '물리 치료'],
    prevention: ['바른 자세', '근력 강화', '장시간 앉기 줄이기'],
    progression: ['근육 긴장', '통증 지속', '기능 저하'],
  },
  {
    id: 'cervical_pain',
    name: '목디스크',
    region: 'neck',
    symptoms: ['목 통증', '어깨 통증', '팔 저림', '두통', '근력 저하'],
    treatments: ['물리 치료', '약물 치료', '자세 교정'],
    prevention: ['모니터 높이 조절', '스트레칭', '장시간 스마트폰 제한'],
    progression: ['디스크 압박', '신경 증상', '통증 만성화'],
  },
  {
    id: 'shoulder_impingement',
    name: '어깨 충돌증후군',
    region: 'shoulder',
    symptoms: ['어깨 통증', '팔 올리기 어려움', '야간 통증', '근력 약화', '삐걱거림'],
    treatments: ['물리 치료', '소염제', '스트레칭'],
    prevention: ['자세 교정', '무리한 사용 제한', '근력 강화'],
    progression: ['힘줄 자극', '통증 증가', '가동 범위 감소'],
  },
  {
    id: 'tennis_elbow',
    name: '테니스 엘보',
    region: 'elbow',
    symptoms: ['팔꿈치 통증', '그립 약화', '손목 움직임 통증', '압통', '저림'],
    treatments: ['휴식', '보조기', '물리 치료'],
    prevention: ['반복 동작 줄이기', '스트레칭', '근력 강화'],
    progression: ['힘줄 염증', '통증 지속', '일상 동작 불편'],
  },
  {
    id: 'carpal_tunnel',
    name: '수근관 증후군',
    region: 'wrist',
    symptoms: ['손 저림', '손목 통증', '야간 증상', '그립 약화', '감각 저하'],
    treatments: ['보조기', '소염제', '수술적 감압'],
    prevention: ['손목 휴식', '자세 교정', '반복 동작 줄이기'],
    progression: ['정중신경 압박', '감각 저하', '근력 감소'],
  },
  {
    id: 'allergic_rhinitis',
    name: '알레르기 비염',
    region: 'head',
    symptoms: ['재채기', '콧물', '코막힘', '눈 가려움', '후비루'],
    treatments: ['항히스타민', '비강 스테로이드', '회피 요법'],
    prevention: ['알레르겐 관리', '공기청정', '마스크 착용'],
    progression: ['점막 부종', '증상 반복', '수면 질 저하'],
  },
  {
    id: 'appendicitis',
    name: '충수염',
    region: 'intestine',
    symptoms: ['우하복부 통증', '발열', '구역감', '식욕 저하', '복부 압통'],
    treatments: ['수술', '항생제', '수액'],
    prevention: ['즉시 진료', '조기 진단', '위생 관리'],
    progression: ['복통 시작', '염증 확산', '파열 위험'],
  },
  {
    id: 'gallstone',
    name: '담석증',
    region: 'liver',
    symptoms: ['우상복부 통증', '구역감', '소화불량', '등 통증', '지방 음식 불편'],
    treatments: ['통증 조절', '담낭 수술', '식이 조절'],
    prevention: ['지방 섭취 조절', '체중 관리', '규칙 식사'],
    progression: ['담석 형성', '담낭염 위험', '통증 반복'],
  },
  {
    id: 'pancreatitis',
    name: '췌장염',
    region: 'pancreas',
    symptoms: ['상복부 통증', '구역감', '발열', '복부 팽만', '식욕 저하'],
    treatments: ['금식', '수액', '통증 조절'],
    prevention: ['과음 피하기', '지질 관리', '담석 관리'],
    progression: ['염증 시작', '통증 심화', '합병증 위험'],
  },
  {
    id: 'constipation',
    name: '변비',
    region: 'intestine',
    symptoms: ['배변 곤란', '복부 팽만', '복통', '잔변감', '식욕 저하'],
    treatments: ['수분 섭취', '식이섬유', '완하제'],
    prevention: ['운동', '규칙 배변', '수분 섭취'],
    progression: ['장운동 저하', '복부 불편', '습관화'],
  },
  {
    id: 'flu',
    name: '독감',
    region: 'lung',
    symptoms: ['고열', '근육통', '기침', '인후통', '피로'],
    treatments: ['항바이러스제', '해열제', '휴식'],
    prevention: ['예방 접종', '손 씻기', '밀집 피하기'],
    progression: ['급성 발열', '호흡기 증상', '회복 단계'],
  },
]

const diseasePriorityByAge = {
  '0-12': ['otitis', 'tonsillitis', 'asthma', 'dermatitis', 'eczema', 'conjunctivitis', 'allergic_rhinitis', 'constipation', 'flu'],
  '13-24': ['migraine', 'asthma', 'allergic_rhinitis', 'dermatitis', 'eczema', 'gastritis'],
  '25-39': ['reflux', 'ibs', 'migraine', 'gastritis', 'sinusitis'],
  '40-59': ['hypertension', 'angina', 'fatty_liver', 'diabetes', 'lumbar_pain', 'cervical_pain'],
  '60+': ['hypertension', 'angina', 'kidney_stone', 'pneumonia'],
}

const diseasePriorityByGender = {
  남성: ['hypertension', 'angina', 'kidney_stone'],
  여성: ['cystitis', 'thyroiditis', 'anemia'],
}

const symptomModifiers = {
  age: {
    '0-12': ['호흡 곤란', '고열', '식욕 저하'],
    '60+': ['체력 저하', '탈수 위험', '만성 피로'],
  },
  gender: {
    여성: ['어지럼', '피로감'],
    남성: ['가슴 답답함'],
  },
}

const conditionModifiers = {
  gastritis: {
    age: {
      '0-12': {
        symptoms: ['구토 빈도 증가', '탈수 위험'],
        treatments: ['경구 수분 보충 우선'],
      },
      '60+': {
        symptoms: ['식욕 저하 두드러짐'],
        treatments: ['약물 부작용 모니터링'],
      },
      '25-39': {
        prevention: ['야식 제한과 스트레스 관리'],
      },
    },
  },
  pneumonia: {
    age: {
      '0-12': {
        symptoms: ['호흡수 증가', '흉벽 함몰'],
        treatments: ['소아 진료 우선'],
      },
      '60+': {
        symptoms: ['식욕 저하와 탈수 동반 가능'],
        treatments: ['호흡 재활 병행'],
      },
    },
  },
  hypertension: {
    age: {
      '40-59': {
        prevention: ['심혈관 검진 주기 단축'],
      },
      '60+': {
        treatments: ['혈압 하강 시 어지럼 모니터링'],
        prevention: ['낙상 예방 동반'],
      },
    },
  },
  angina: {
    gender: {
      여성: {
        symptoms: ['비전형적 흉부 불편 가능'],
      },
    },
    age: {
      '60+': {
        treatments: ['심혈관 합병증 평가'],
      },
    },
  },
  asthma: {
    age: {
      '0-12': {
        symptoms: ['야간 기침 빈도 증가'],
        treatments: ['흡입기 사용 교육'],
      },
      '60+': {
        symptoms: ['운동 시 숨참 증가'],
      },
    },
  },
  bronchitis: {
    age: {
      '0-12': {
        symptoms: ['쌕쌕거림 동반'],
      },
      '60+': {
        treatments: ['호흡기 합병증 관찰'],
      },
    },
  },
  migraine: {
    gender: {
      여성: {
        symptoms: ['월경 주기 연관 가능'],
        prevention: ['주기별 트리거 기록'],
      },
    },
    age: {
      '13-24': {
        prevention: ['수면 불규칙 교정'],
      },
    },
  },
  sinusitis: {
    age: {
      '0-12': {
        symptoms: ['코막힘 지속', '후비루 증가'],
        treatments: ['비강 세척 강화'],
      },
    },
  },
  conjunctivitis: {
    age: {
      '0-12': {
        prevention: ['손 위생과 접촉 차단'],
      },
    },
  },
  otitis: {
    age: {
      '0-12': {
        treatments: ['경과 관찰 및 재검'],
        prevention: ['감기 관리 강화'],
      },
    },
  },
  tonsillitis: {
    age: {
      '0-12': {
        symptoms: ['삼킴 곤란 증가'],
        treatments: ['수분 섭취 집중'],
      },
    },
  },
  ulcer: {
    age: {
      '60+': {
        treatments: ['NSAIDs 복용 여부 확인'],
      },
      '40-59': {
        prevention: ['헬리코박터 검사 고려'],
      },
    },
  },
  ibs: {
    gender: {
      여성: {
        symptoms: ['복부 팽만감 증가'],
      },
    },
    age: {
      '13-24': {
        prevention: ['스트레스 요인 관리'],
      },
    },
  },
  colitis: {
    age: {
      '60+': {
        treatments: ['탈수 모니터링'],
      },
    },
  },
  fatty_liver: {
    gender: {
      남성: {
        prevention: ['음주량 점검 강화'],
      },
    },
    age: {
      '40-59': {
        prevention: ['대사질환 동시 관리'],
      },
    },
  },
  hepatitis: {
    age: {
      '0-12': {
        prevention: ['예방 접종 확인'],
      },
      '60+': {
        treatments: ['간기능 수치 모니터링'],
      },
    },
  },
  kidney_stone: {
    gender: {
      남성: {
        prevention: ['수분 섭취량 유지'],
      },
    },
    age: {
      '60+': {
        treatments: ['신기능 확인'],
      },
    },
  },
  cystitis: {
    gender: {
      여성: {
        symptoms: ['하복부 불편', '배뇨 후 잔여감 증가'],
        treatments: ['수분 섭취량 증가 권장'],
        prevention: ['배뇨 후 위생 관리 강화'],
      },
      남성: {
        symptoms: ['전립선 관련 불편 가능성'],
        treatments: ['전립선 동반 평가'],
        prevention: ['장시간 앉기 줄이기'],
      },
    },
  },
  anemia: {
    gender: {
      여성: {
        symptoms: ['월경량 변화 동반 가능'],
        treatments: ['철분 보충 시 월경 주기 확인'],
        prevention: ['철분/엽산 섭취 강화'],
      },
    },
    age: {
      '0-12': {
        symptoms: ['성장 지연 가능'],
        treatments: ['영양 보충 강화'],
      },
      '60+': {
        treatments: ['만성 질환 동반 평가'],
      },
    },
  },
  diabetes: {
    age: {
      '60+': {
        symptoms: ['감각 저하 및 상처 회복 지연'],
        prevention: ['발 관리 및 상처 확인'],
      },
      '40-59': {
        prevention: ['체중 및 혈당 모니터링 강화'],
      },
    },
  },
  osteoporosis: {
    gender: {
      여성: {
        prevention: ['폐경 이후 골밀도 검사'],
      },
    },
    age: {
      '60+': {
        prevention: ['낙상 예방 운동'],
      },
    },
  },
  thyroiditis: {
    gender: {
      여성: {
        symptoms: ['피로와 체중 변화 뚜렷'],
        treatments: ['호르몬 수치 모니터링'],
      },
    },
    age: {
      '25-39': {
        treatments: ['증상 기록 및 추적'],
      },
    },
  },
  dermatitis: {
    age: {
      '0-12': {
        symptoms: ['팔/다리 굴곡 부위 악화'],
        treatments: ['보습 집중 적용'],
      },
    },
  },
  eczema: {
    age: {
      '0-12': {
        symptoms: ['야간 가려움 증가'],
        prevention: ['실내 습도 유지'],
      },
    },
  },
  urticaria: {
    age: {
      '13-24': {
        prevention: ['알레르겐 추적 기록'],
      },
    },
  },
  lumbar_pain: {
    age: {
      '25-39': {
        prevention: ['장시간 앉기 제한'],
      },
      '60+': {
        treatments: ['골밀도 확인'],
      },
    },
  },
  cervical_pain: {
    age: {
      '13-24': {
        prevention: ['스마트폰 사용 자세 교정'],
      },
      '25-39': {
        treatments: ['근막 이완 스트레칭'],
      },
    },
  },
  shoulder_impingement: {
    age: {
      '40-59': {
        treatments: ['회전근개 스트레칭'],
      },
    },
  },
  tennis_elbow: {
    age: {
      '25-39': {
        prevention: ['반복 작업 중 휴식'],
      },
    },
  },
  carpal_tunnel: {
    gender: {
      여성: {
        treatments: ['손목 보조기 사용'],
      },
    },
    age: {
      '40-59': {
        prevention: ['손목 부담 동작 감소'],
      },
    },
  },
  allergic_rhinitis: {
    age: {
      '13-24': {
        prevention: ['계절 알레르겐 회피'],
      },
    },
  },
  appendicitis: {
    age: {
      '13-24': {
        symptoms: ['우하복부 통증 급증'],
      },
      '60+': {
        symptoms: ['통증 위치 모호'],
      },
    },
  },
  gallstone: {
    gender: {
      여성: {
        symptoms: ['지방 음식 후 통증 증가'],
      },
    },
    age: {
      '40-59': {
        prevention: ['체중 급변 피하기'],
      },
    },
  },
  pancreatitis: {
    age: {
      '40-59': {
        prevention: ['음주 습관 점검'],
      },
    },
  },
  constipation: {
    age: {
      '0-12': {
        prevention: ['배변 습관 교육'],
      },
      '60+': {
        treatments: ['복용 약물 영향 확인'],
      },
    },
  },
  flu: {
    age: {
      '0-12': {
        symptoms: ['급성 고열 지속'],
      },
      '60+': {
        treatments: ['합병증 모니터링'],
      },
    },
  },
  reflux: {
    age: {
      '0-12': {
        symptoms: ['수유 후 역류 빈도'],
      },
      '25-39': {
        treatments: ['식사 시간 분산'],
      },
      '60+': {
        prevention: ['야간 흡인 위험 주의'],
      },
    },
  },
}

const regions = [
  { id: 'brain', label: '뇌' },
  { id: 'eye', label: '눈' },
  { id: 'ear', label: '귀' },
  { id: 'jaw', label: '턱' },
  { id: 'throat', label: '목' },
  { id: 'neck', label: '경부' },
  { id: 'heart', label: '심장' },
  { id: 'lung', label: '폐' },
  { id: 'chest', label: '흉부' },
  { id: 'stomach', label: '위' },
  { id: 'liver', label: '간' },
  { id: 'pancreas', label: '췌장' },
  { id: 'intestine', label: '장' },
  { id: 'kidney', label: '신장' },
  { id: 'pelvis', label: '방광' },
  { id: 'spine', label: '척추' },
  { id: 'shoulder', label: '어깨' },
  { id: 'elbow', label: '팔꿈치' },
  { id: 'wrist', label: '손목' },
  { id: 'skin', label: '피부' },
  { id: 'blood', label: '혈액' },
  { id: 'body', label: '전신' },
  { id: 'head', label: '두부' },
]

const ageRanges = ['0-12', '13-24', '25-39', '40-59', '60+']

function App() {
  const [searchMode, setSearchMode] = useState('disease')
  const [query, setQuery] = useState('')
  const [selectedDiseaseId, setSelectedDiseaseId] = useState('')
  const [selectedSymptomIds, setSelectedSymptomIds] = useState([])
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
    if (selectedSymptomIds.length === 0) return []
    return diseases.filter((disease) =>
      selectedSymptomIds.every((symptom) => disease.symptoms.includes(symptom))
    )
  }, [selectedSymptomIds])

  const partialMatchDiseases = useMemo(() => {
    if (selectedSymptomIds.length === 0) return []
    return diseases
      .map((disease) => {
        const matchCount = selectedSymptomIds.filter((symptom) =>
          disease.symptoms.includes(symptom)
        ).length
        return { ...disease, matchCount }
      })
      .filter((disease) => disease.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount || a.name.localeCompare(b.name))
      .slice(0, 5)
  }, [selectedSymptomIds])

  const demographicRankedDiseases = useMemo(() => {
    const ageBoost = diseasePriorityByAge[ageRange] || []
    const genderBoost = diseasePriorityByGender[gender] || []
    return relatedDiseases
      .map((disease) => {
        const matchScore = getSymptomMatchScore(disease, selectedSymptomIds)
        const conditionBoost = getConditionBoost(disease.id, gender, ageRange)
        const score =
          matchScore * 2 +
          conditionBoost +
          (ageBoost.includes(disease.id) ? 2 : 0) +
          (genderBoost.includes(disease.id) ? 1 : 0)
        return { ...disease, _score: score, _matchScore: matchScore }
      })
      .sort(
        (a, b) =>
          b._score - a._score ||
          b._matchScore - a._matchScore ||
          a.name.localeCompare(b.name)
      )
  }, [relatedDiseases, ageRange, gender, selectedSymptomIds])

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
    if (searchMode === 'symptom' && demographicRankedDiseases.length > 0) {
      return Array.from(
        new Set(demographicRankedDiseases.map((disease) => disease.region))
      )
    }
    return []
  }, [searchMode, selectedDisease, demographicRankedDiseases])

  const rightPanelTitle = searchMode === 'disease' ? '증상' : '질환'
  const leftPanelTitle = searchMode === 'disease' ? '질환' : '증상'
  const highlightTargets = getHighlightTargets(activeRegions[0])

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
                    setSelectedSymptomIds([])
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

          {searchMode === 'symptom' && (
            <div className="selection-hint">
              여러 증상을 선택할 수 있습니다.
            </div>
          )}

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
                      : selectedSymptomIds.includes(item.id)
                        ? 'active'
                        : ''
                  }`}
                  onClick={() => {
                    if (searchMode === 'disease') {
                      setSelectedDiseaseId(item.id)
                      setSelectedSymptomIds([])
                    } else {
                      setSelectedDiseaseId('')
                      setSelectedSymptomIds((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((symptom) => symptom !== item.id)
                          : [...prev, item.id]
                      )
                    }
                  }}
                >
                  <span>{item.name}</span>
                  <span className="badge">
                    {searchMode === 'symptom' && selectedSymptomIds.includes(item.id)
                      ? '선택됨'
                      : '선택'}
                  </span>
                </button>
              )
            )}
          </div>
        </section>

        <section className="center-panel">
          <div className="model-card">
            <div className="model-header">
              <div className="model-title-row">
                <div>
                  <p className="model-eyebrow">Full Body Mapping</p>
                  <h2>해부 도면</h2>
                  <p>영역을 선택하면 관련 증상이 연결됩니다.</p>
                </div>
                <div className="mini-controls">
                  <p>개인 변수</p>
                  <div className="chips">
                    {['남성', '여성'].map((label) => (
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
              </div>
            </div>

            <div className="model-stage">
              <div className="body">
                <img className="body-image" src={bodyImg} alt="인체 모형" />
                {highlightTargets.map((target) => (
                  <div key={target.id} className="body-highlight">
                    <div
                      className="body-highlight-ring"
                      style={{
                        top: target.top,
                        left: target.left,
                        width: target.width,
                        height: target.height,
                      }}
                    />
                    {target.label && (
                      <div
                        className="body-highlight-label"
                        style={{
                          top: target.labelTop,
                          left: target.labelLeft,
                        }}
                      >
                        <span className="body-highlight-line" />
                        <span className="body-highlight-text">
                          {target.label}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                {regions.map((region) => (
                  <div
                    key={region.id}
                    className={`region ${region.id} ${
                      activeRegions.includes(region.id) ? 'active' : ''
                    }`}
                    aria-hidden="true"
                  />
                ))}
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
              getDemographicSymptoms(
                selectedDisease.symptoms,
                gender,
                ageRange,
                selectedDisease.id
              ).map((symptom) => (
                <div key={symptom} className="list-item static">
                  <span>{symptom}</span>
                  <span className="tag">증상</span>
                </div>
              ))
            ) : demographicRankedDiseases.length > 0 ? (
              demographicRankedDiseases.map((disease) => (
                <button
                  key={disease.id}
                  className={`list-item ${
                    disease.id === focusedDisease?.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedDiseaseId(disease.id)}
                >
                  <span>{disease.name}</span>
                  <span className="badge">
                    {getPriorityLabel(disease, gender, ageRange)}
                  </span>
                </button>
              ))
            ) : searchMode === 'symptom' && selectedSymptomIds.length > 0 ? (
              <div className="empty">
                선택한 증상을 모두 만족하는 질환이 없습니다. 증상을 일부 해제하거나
                비슷한 증상으로 다시 시도해 주세요.
                {partialMatchDiseases.length > 0 && (
                  <div className="fallback">
                    <p>가장 유사한 질환</p>
                    <div className="fallback-list">
                      {partialMatchDiseases.map((disease) => (
                        <button
                          key={disease.id}
                          className="list-item"
                          onClick={() => setSelectedDiseaseId(disease.id)}
                        >
                          <span>{disease.name}</span>
                          <span className="badge">부분 일치</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty">검색 결과가 없습니다.</div>
            )}
          </div>

          <div className="divider" />

          <div className="care">
            <div>
              <h3>치료법</h3>
              <ul>
                {getConditionCare(
                  focusedDisease,
                  'treatments',
                  gender,
                  ageRange
                )
                  .map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>예방법</h3>
              <ul>
                {getConditionCare(
                  focusedDisease,
                  'prevention',
                  gender,
                  ageRange
                )
                  .map((item) => (
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

function getDemographicSymptoms(baseSymptoms, gender, ageRange, diseaseId) {
  const extras = []
  if (ageRange && symptomModifiers.age[ageRange]) {
    extras.push(...symptomModifiers.age[ageRange])
  }
  if (gender && symptomModifiers.gender[gender]) {
    extras.push(...symptomModifiers.gender[gender])
  }
  if (diseaseId) {
    const condition = conditionModifiers[diseaseId]
    if (condition?.age?.[ageRange]?.symptoms) {
      extras.push(...condition.age[ageRange].symptoms)
    }
    if (condition?.gender?.[gender]?.symptoms) {
      extras.push(...condition.gender[gender].symptoms)
    }
  }
  const combined = baseSymptoms.concat(extras)
  return Array.from(new Set(combined))
}

function getPriorityLabel(disease, gender, ageRange) {
  const ageBoost = diseasePriorityByAge[ageRange] || []
  const genderBoost = diseasePriorityByGender[gender] || []
  if (ageBoost.includes(disease.id) || genderBoost.includes(disease.id)) {
    return '우선'
  }
  return '관련'
}

function getSymptomMatchScore(disease, selectedSymptoms) {
  if (!selectedSymptoms || selectedSymptoms.length === 0) return 0
  return selectedSymptoms.filter((symptom) => disease.symptoms.includes(symptom))
    .length
}

function getConditionBoost(diseaseId, gender, ageRange) {
  const condition = conditionModifiers[diseaseId]
  let score = 0
  if (condition?.age?.[ageRange]) {
    score += 1
  }
  if (condition?.gender?.[gender]) {
    score += 1
  }
  return score
}

function getHighlightTargets(regionId) {
  if (!regionId) return []

  const yOffset = 3.5
  const scale = 0.5
  const applyOffset = (value, offset = yOffset) => {
    if (!value || !value.endsWith('%')) return value
    const num = Number.parseFloat(value)
    if (Number.isNaN(num)) return value
    return `${num + offset}%`
  }
  const applyScale = (value, factor = scale) => {
    if (!value || !value.endsWith('px')) return value
    const num = Number.parseFloat(value)
    if (Number.isNaN(num)) return value
    return `${Math.max(24, num * factor)}px`
  }

  const targets = {
    brain: [{
      id: 'brain',
      top: '16%',
      left: '50%',
      width: '120px',
      height: '150px',
      label: 'HEAD',
      labelTop: '16%',
      labelLeft: '70%',
    }],
    head: [{
      id: 'head',
      top: '16%',
      left: '50%',
      width: '120px',
      height: '150px',
      label: 'HEAD',
      labelTop: '16%',
      labelLeft: '70%',
    }],
    eye: [{
      id: 'eye',
      top: '18%',
      left: '50%',
      width: '110px',
      height: '90px',
      label: 'HEAD',
      labelTop: '18%',
      labelLeft: '70%',
    }],
    ear: [{
      id: 'ear',
      top: '19%',
      left: '50%',
      width: '110px',
      height: '90px',
      label: 'HEAD',
      labelTop: '19%',
      labelLeft: '70%',
    }],
    jaw: [{
      id: 'jaw',
      top: '24%',
      left: '50%',
      width: '120px',
      height: '110px',
      label: 'JAW',
      labelTop: '24%',
      labelLeft: '70%',
    }],
    throat: [{
      id: 'throat',
      top: '28%',
      left: '50%',
      width: '110px',
      height: '130px',
      label: 'THROAT',
      labelTop: '28%',
      labelLeft: '70%',
    }],
    neck: [{
      id: 'neck',
      top: '28%',
      left: '50%',
      width: '110px',
      height: '130px',
      label: 'NECK',
      labelTop: '28%',
      labelLeft: '70%',
    }],
    lung: [
      {
        id: 'lung-left',
        top: '36%',
        left: '44%',
        width: '120px',
        height: '160px',
      },
      {
        id: 'lung-right',
        top: '36%',
        left: '56%',
        width: '120px',
        height: '160px',
        label: 'LUNGS',
        labelTop: '36%',
        labelLeft: '70%',
      },
    ],
    heart: [{
      id: 'heart',
      top: '39%',
      left: '50%',
      width: '120px',
      height: '150px',
      label: 'HEART',
      labelTop: '39%',
      labelLeft: '70%',
    }],
    chest: [{
      id: 'chest',
      top: '36%',
      left: '50%',
      width: '220px',
      height: '200px',
      label: 'CHEST',
      labelTop: '36%',
      labelLeft: '70%',
    }],
    stomach: [{
      id: 'stomach',
      top: '48%',
      left: '50%',
      width: '140px',
      height: '140px',
      label: 'STOMACH',
      labelTop: '48%',
      labelLeft: '70%',
    }],
    liver: [{
      id: 'liver',
      top: '47%',
      left: '55%',
      width: '150px',
      height: '120px',
      label: 'LIVER',
      labelTop: '47%',
      labelLeft: '70%',
    }],
    pancreas: [{
      id: 'pancreas',
      top: '52%',
      left: '50%',
      width: '140px',
      height: '120px',
      label: 'PANCREAS',
      labelTop: '52%',
      labelLeft: '70%',
    }],
    intestine: [{
      id: 'intestine',
      top: '62%',
      left: '50%',
      width: '180px',
      height: '200px',
      label: 'ABDOMEN',
      labelTop: '62%',
      labelLeft: '70%',
    }],
    kidney: [
      {
        id: 'kidney-left',
        top: '50%',
        left: '43%',
        width: '110px',
        height: '130px',
      },
      {
        id: 'kidney-right',
        top: '50%',
        left: '57%',
        width: '110px',
        height: '130px',
        label: 'KIDNEY',
        labelTop: '50%',
        labelLeft: '70%',
      },
    ],
    pelvis: [{
      id: 'pelvis',
      top: '74%',
      left: '50%',
      width: '160px',
      height: '150px',
      label: 'PELVIS',
      labelTop: '74%',
      labelLeft: '70%',
    }],
    spine: [{
      id: 'spine',
      top: '42%',
      left: '50%',
      width: '120px',
      height: '220px',
      label: 'SPINE',
      labelTop: '42%',
      labelLeft: '70%',
    }],
    shoulder: [{
      id: 'shoulder',
      top: '31%',
      left: '34%',
      width: '120px',
      height: '120px',
      label: 'SHOULDER',
      labelTop: '31%',
      labelLeft: '70%',
    }],
    elbow: [{
      id: 'elbow',
      top: '55%',
      left: '24%',
      width: '120px',
      height: '120px',
      label: 'ELBOW',
      labelTop: '55%',
      labelLeft: '70%',
    }],
    wrist: [{
      id: 'wrist',
      top: '74%',
      left: '20%',
      width: '120px',
      height: '120px',
      label: 'WRIST',
      labelTop: '74%',
      labelLeft: '70%',
    }],
    skin: [{
      id: 'skin',
      top: '48%',
      left: '50%',
      width: '280px',
      height: '360px',
      label: 'SKIN',
      labelTop: '48%',
      labelLeft: '70%',
    }],
    blood: [{
      id: 'blood',
      top: '38%',
      left: '50%',
      width: '220px',
      height: '200px',
      label: 'BLOOD',
      labelTop: '38%',
      labelLeft: '70%',
    }],
    body: [{
      id: 'body',
      top: '52%',
      left: '50%',
      width: '320px',
      height: '420px',
      label: 'BODY',
      labelTop: '52%',
      labelLeft: '70%',
    }],
  }

  return (targets[regionId] || []).map((target) => ({
    ...target,
    top: applyOffset(target.top),
    labelTop: applyOffset(target.labelTop),
    width: applyScale(target.width),
    height: applyScale(target.height),
  }))
}

function getConditionCare(disease, type, gender, ageRange) {
  if (!disease) return []
  const base = disease[type] || []
  const extras = []
  const condition = conditionModifiers[disease.id]
  if (condition?.age?.[ageRange]?.[type]) {
    extras.push(...condition.age[ageRange][type])
  }
  if (condition?.gender?.[gender]?.[type]) {
    extras.push(...condition.gender[gender][type])
  }
  return base.concat(extras)
}

export default App
