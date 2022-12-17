import React from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { MapCard } from '@app/components/medical-dashboard/mapCard/MapCard';
import { ScreeningsCard } from '@app/components/medical-dashboard/screeningsCard/ScreeningsCard/ScreeningsCard';
import { ActivityCard } from '@app/components/medical-dashboard/activityCard/ActivityCard';
import { TreatmentCard } from '@app/components/medical-dashboard/treatmentCard/TreatmentCard';
import { CovidCard } from '@app/components/medical-dashboard/covidCard/CovidCard';
import { HealthCard } from '@app/components/medical-dashboard/HealthCard/HealthCard';
import { FavoritesDoctorsCard } from '@app/components/medical-dashboard/favoriteDoctors/FavoriteDoctorsCard/FavoritesDoctorsCard';
import { PatientResultsCard } from '@app/components/medical-dashboard/PatientResultsCard/PatientResultsCard';
import { StatisticsCards } from '@app/components/medical-dashboard/statisticsCards/StatisticsCards';
import { BloodScreeningCard } from '@app/components/medical-dashboard/bloodScreeningCard/BloodScreeningCard/BloodScreeningCard';
import { NewsCard } from '@app/components/medical-dashboard/NewsCard/NewsCard';
import { References } from '@app/components/common/References/References';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './DashboardPage.styles';

import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import CodeMirror from '@uiw/react-codemirror';
import {python} from '@codemirror/lang-python';
import {sql} from '@codemirror/lang-sql';
import {markdown} from '@codemirror/lang-markdown';
import { oneDarkTheme } from "@codemirror/theme-one-dark";

import NotebookCell from '@app/components/notebooks/NotebookCell';
import NotebookEnvTree from '@app/components/notebooks/NotebookEnvTree';
import NotebookSources from '@app/components/notebooks/NotebookSources';
import NotebookRightColumn from '@app/components/notebooks/NotebookRightColumn';
import NotebookFileMenu from '@app/components/notebooks/NotebookFileMenu';

import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'

import Plot from 'react-plotly.js'

const MedicalDashboardPage: React.FC = () => {
  const { isTablet, isDesktop } = useResponsive();

  const { t } = useTranslation();


  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);




  const desktopLayout = (

    <>
    <Row>

    
<S.LeftSideCol xl={16} xxl={17} id="desktop-content">
        <Row gutter={[60, 60]}>
          <Col span={24}>

            <NotebookFileMenu />
            
          <NotebookCell />
          </Col>
          </Row>
          </S.LeftSideCol>


      <S.RightSideCol xl={8} xxl={7}>


          <NotebookRightColumn />

        
        <S.Space />
      </S.RightSideCol>
      </Row>
    </>


  //   <Row>
  //     <S.LeftSideCol xl={16} xxl={17}>
  //       <Row gutter={[30, 30]}>
  //         <Col span={24}>
  //           <Row gutter={[30, 30]}>
  //             <StatisticsCards />
  //           </Row>
  //         </Col>

  //         <Col id="map" span={24}>
  //           <MapCard />
  //         </Col>

  //         <Col id="latest-screenings" span={24}>
  //           <ScreeningsCard />
  //         </Col>

  //         <Col id="treatment-plan" xl={24}>
  //           <TreatmentCard />
  //         </Col>

  //         <Col id="covid" xl={24}>
  //           <CovidCard />
  //         </Col>

  //         <Col id="activity" xl={24} xxl={12}>
  //           <ActivityCard />
  //         </Col>

  //         <Col id="health" xl={24} xxl={12}>
  //           <HealthCard />
  //         </Col>

  //         <Col id="favorite-doctors" xl={24}>
  //           <FavoritesDoctorsCard />
  //         </Col>

  //         <Col id="news" span={24}>
  //           <NewsCard />
  //         </Col>
  //       </Row>
  //       <References />
  //     </S.LeftSideCol>

  //     <S.RightSideCol xl={8} xxl={7}>
  //       <div id="blood-screening">
  //         <BloodScreeningCard />
  //       </div>
  //       <S.Space />
  //       <S.ScrollWrapper id="patient-timeline">
  //         <PatientResultsCard />
  //       </S.ScrollWrapper>
  //     </S.RightSideCol>
  //   </Row>
  );


  const mobileAndTabletLayout = (
    <>
<Row>


<S.LeftSideCol xl={16} xxl={17} id="desktop-content">
        <Row gutter={[60, 60]}>
          <Col span={24}>
          <NotebookCell />
          </Col>
          </Row>
          </S.LeftSideCol>


      <S.RightSideCol xl={8} xxl={7}>

          <p>right column</p>
        
        <S.Space />
      </S.RightSideCol>
      </Row>

    <Row>
      hello from mobile!

      <CodeMirror
      value="console.log('hello world!');"
      height="200px"
      extensions={[python(), oneDarkTheme]}
      onChange={onChange}
    />


<BaseTable data={[{"id": 0, "col0": "c0", "col1": "c1"}, {"id": 1, "col0": "row1", "col1": "row1"}]} width={600} height={400}>
  <Column key="col0" dataKey="col0" width={100} />
  <Column key="col1" dataKey="col1" width={100} />
  
</BaseTable>


<Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
    


    </Row>

    <Row>

    <CodeMirror
      value="SQL Editor"
      height="200px"
      extensions={[sql({}), oneDarkTheme]}
      onChange={onChange}
    />

    </Row>

    <Row>

<CodeMirror
  value="Markdown Editor"
  height="200px"
  extensions={[markdown({}), oneDarkTheme]}
  onChange={onChange}
/>
    </Row>
    </>

  //   <Row gutter={[20, 20]}>
  //     <StatisticsCards />

  //     {isTablet && (
  //       <Col id="map" md={24} order={4}>
  //         <MapCard />
  //       </Col>
  //     )}

  //     <Col id="latest-screenings" xs={24} md={12} order={(isTablet && 5) || 0}>
  //       <ScreeningsCard />
  //     </Col>

  //     <Col id="activity" xs={24} md={12} order={(isTablet && 8) || 0}>
  //       <ActivityCard />
  //     </Col>

  //     <Col id="treatment-plan" xs={24} md={24} order={(isTablet && 10) || 0}>
  //       <TreatmentCard />
  //     </Col>

  //     <Col id="health" xs={24} md={12} order={(isTablet && 9) || 0}>
  //       <HealthCard />
  //     </Col>

  //     <Col id="patient-timeline" xs={24} md={12} order={(isTablet && 11) || 0}>
  //       <PatientResultsCard />
  //     </Col>

  //     <Col id="blood-screening" xs={24} md={12} order={(isTablet && 6) || 0}>
  //       <BloodScreeningCard />
  //     </Col>

  //     <Col id="favorite-doctors" xs={24} md={24} order={(isTablet && 13) || 0}>
  //       <FavoritesDoctorsCard />
  //     </Col>

  //     <Col id="covid" xs={24} md={12} order={(isTablet && 12) || 0}>
  //       <CovidCard />
  //     </Col>

  //     <Col id="news" xs={24} md={24} order={(isTablet && 14) || 0}>
  //       <NewsCard />
  //     </Col>
  //   </Row>
  );



  return (
    <>
      <PageTitle>{t('common.medical-dashboard')}</PageTitle>
      {isDesktop ? desktopLayout : mobileAndTabletLayout}
      
    </>

      

  );
};

export default MedicalDashboardPage;
