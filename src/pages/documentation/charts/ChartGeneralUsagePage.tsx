import React from 'react';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardBody,
	CardCodeView,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import CommonHowToUse from '../../../common/other/CommonHowToUse';
import CommonDesc from '../../../common/other/CommonDesc';
import { AlertLink } from '../../../components/bootstrap/Alert';
import Button from '../../../components/bootstrap/Button';

const ChartGeneralUsagePage = () => {
	const GENERAL_USAGE = `
<Chart 
	series={ Array } 
	options={ Object } 
	type={ String } // 'line' || 'area' || 'bar' || 'pie' || 'donut' || 'scatter' || 'bubble' || 'heatmap' || 'radialBar' || 'rangeBar' || 'candlestick' || 'boxPlot' || 'radar' || 'polarArea' 
	height={ Number || String }
	width={ Number || String }
	className={ String } />`;

	const SERIES_PROP_TYPES = `
	series: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.shape({
				name: PropTypes.string,
				data: PropTypes.arrayOf(
					PropTypes.oneOfType([
						PropTypes.string,
						PropTypes.number,
						PropTypes.arrayOf(
							PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
						),
						PropTypes.shape({
							x: PropTypes.oneOfType([
								PropTypes.string,
								PropTypes.number,
								PropTypes.arrayOf(
									PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
								),
								PropTypes.object,
							]),
							y: PropTypes.oneOfType([
								PropTypes.string,
								PropTypes.number,
								PropTypes.arrayOf(
									PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
								),
								PropTypes.object,
							]),
						}),
					]),
				),
			}),
		]),
	).isRequired,`;

	const OPTIONS_PROP_TYPES = `
options: PropTypes.shape({
	annotations: PropTypes.object,
	chart: PropTypes.object,
	colors: PropTypes.array,
	dataLabels: PropTypes.object,
	fill: PropTypes.object,
	grid: PropTypes.object,
	labels: PropTypes.array,
	legend: PropTypes.object,
	markers: PropTypes.object,
	noData: PropTypes.object,
	plotOptions: PropTypes.object,
	responsive: PropTypes.array,
	series: PropTypes.array,
	states: PropTypes.object,
	stroke: PropTypes.object,
	subtitle: PropTypes.object,
	theme: PropTypes.object,
	title: PropTypes.object,
	tooltip: PropTypes.object,
	xaxis: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	yaxis: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}).isRequired,`;


	return (
		<PageWrapper>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Charts', to: '/charts' },
							{ title: 'General Usage', to: '/charts/general-usage' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle>General Usage</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<CardCodeView>{GENERAL_USAGE}</CardCodeView>
							</CardBody>
						</Card>
					</div>

					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='EditAttributes'>
									<CardTitle>series</CardTitle>
									<CardSubTitle>Chart</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<CommonHowToUse isPrism>{SERIES_PROP_TYPES}</CommonHowToUse>
								<CommonDesc>
									More information,{' '}
									<AlertLink
										href='https://apexcharts.com/docs/series/'
										target='_blank'
										rel='noreferrer'>
										Apex Charts
									</AlertLink>
									.
								</CommonDesc>
							</CardBody>
						</Card>
					</div>

					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='EditAttributes'>
									<CardTitle>options</CardTitle>
									<CardSubTitle>Chart</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<CommonHowToUse isPrism>{OPTIONS_PROP_TYPES}</CommonHowToUse>
								<CommonDesc>
									More information,{' '}
									<AlertLink
										href='https://apexcharts.com/docs/options/annotations/'
										target='_blank'
										rel='noreferrer'>
										Apex Charts
									</AlertLink>
									.
								</CommonDesc>
							</CardBody>
						</Card>
					</div>

					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='EditAttributes'>
									<CardTitle>type</CardTitle>
									<CardSubTitle>Chart</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardHeader>
								<CommonHowToUse isPrism>
									type: PropTypes.oneOf(['line', 'area', 'bar', 'pie', 'donut',
									'scatter', 'bubble', 'heatmap', 'radialBar', 'rangeBar',
									'candlestick', 'boxPlot', 'radar', 'polarArea']),
								</CommonHowToUse>
							</CardHeader>
							
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ChartGeneralUsagePage;
