import { useEffect, useState } from 'react';
import { Flex, Box, Heading, Divider, RadioGroup, Button } from '@chakra-ui/react';
import { Questions, nestedAnswer, questions } from './questions';
import TooltipBox from './components/Tooltip';
import RadioButton from './components/RadioButton';

function App() {
	const [step, setStep] = useState(1);
	const [currentStep, setCurrentStep]: any = useState(questions[0]);
	const [selectedVariant, setSelectedVariant]: any = useState([]);
	const [currentRadioValue, setCurrentRadioValue]: any = useState('');
	const [answerStep, setAnswerStep] = useState(0);
	const [selectedStep, setSelectedStep] = useState(0);

	const nestedQuestions = questions[0].answers[selectedStep];

	const getCurrentAnswerIndex = (): number => {
		return questions[0].answers.findIndex((answer) => {
			return answer.text === currentRadioValue;
		});
	};

	const getCurrentAnswers = (): Questions => {
		let answers: any = [];
		if (step <= 1) {
			answers = questions[0].answers.filter((answer) => {
				return answer.text === currentRadioValue;
			})[0].answers[answerStep];
		} else {
			answers = nestedQuestions.answers[answerStep];
		}

		return answers;
	};

	const nextStep = () => {
		setStep((prev) => prev + 1);
		if (step > 1) {
			setAnswerStep((prev) => prev + 1);
		}
		if (step - 2 < nestedQuestions.length) {
			setCurrentStep(getCurrentAnswers());
			if (step === 1) {
				setSelectedStep(getCurrentAnswerIndex());
			}
			const variantArray = selectedVariant.filter((variant: { step: number; value: string; question: string }) => {
				if (step !== variant.step) {
					return variant;
				}
			});

			setSelectedVariant([...variantArray, { step: step, value: currentRadioValue, question: currentStep.title }]);
		}
	};

	const prevStep = () => {
		setStep((prev) => prev - 1);
		setAnswerStep((prev) => (prev - 1 > 0 ? prev - 1 : 0));
	};

	const changeCurrentRadioValue = (value: string) => {
		setCurrentRadioValue(
			currentStep.answers.filter((answer: nestedAnswer): string => {
				return answer.text === value ? answer.text : '';
			})[0].text
		);
	};

	useEffect(() => {
		if (step > 1) {
			setCurrentStep(getCurrentAnswers());
		} else {
			setCurrentStep(questions[0]);
		}
	}, [step]);

	return (
		<Flex
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			py='60px'
			width='100%'>
			<Heading
				as='h1'
				maxWidth='890px'
				textAlign='center'
				fontWeight='400'
				fontSize='45px'
				lineHeight='1.2'>
				Пройдите небольшой опрос и узнайте, как &nbsp;
				<Box
					display='inline'
					color='#D44B4B'>
					избежать рисков при продаже или покупке &nbsp;
				</Box>
				вашей квартиры
			</Heading>
			<Flex
				mt='35px'
				borderRadius='20px'
				borderWidth='1px'
				borderStyle='solid'
				borderColor='#F2F2F2'
				boxShadow='1px 3px 20px 0px rgba(240, 240, 240, 0.80)'
				bgColor='#fff'
				px='70px'
				pt='20px'
				pb='40px'
				maxWidth='1040px'
				width='100%'
				minHeight='585px'
				flexDirection='column'>
				{currentStep ? (
					<>
						<Box>
							<Box
								color='#BDBDBD'
								lineHeight='1.6'>
								Вопрос {step}
							</Box>
							<Divider
								bgColor='#F2F2F2'
								mt='30px'
								mb='40px'
							/>
						</Box>

						<Flex
							flexDirection='column'
							flexGrow='1'>
							<Heading
								as='h2'
								fontSize='35px'
								fontWeight='400'
								lineHeight='1.3'
								color='#121761'
								display='flex'
								alignItems='center'>
								{currentStep.title}
								{currentStep.tooltipText !== undefined ? <TooltipBox text={currentStep.tooltipText} /> : ''}
							</Heading>

							<RadioGroup
								name={currentStep.title}
								mt='40px'
								display='grid'
								gridTemplateColumns='1fr 1fr'
								gap='20px'
								mb='25px'>
								{currentStep.answers.map((answer: nestedAnswer) => (
									<RadioButton
										key={currentStep.title + answer.text}
										text={answer.text}
										tooltipText={answer.tooltipText}
										setRadioValue={changeCurrentRadioValue}
									/>
								))}
							</RadioGroup>
							<Flex
								mt='auto'
								justifyContent='flex-end'>
								{step > 1 ? (
									<Button
										size='lg'
										mr='20px'
										variant='outline'
										display='flex'
										alignItems='center'
										gap='10px'
										onClick={prevStep}>
										<svg
											width='24'
											height='24'
											viewBox='0 0 1024 1024'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												fill='currentColor'
												d='M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64'
											/>
											<path
												fill='currentColor'
												d='m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z'
											/>
										</svg>
										Назад
									</Button>
								) : (
									''
								)}

								<Button
									size='lg'
									colorScheme='red'
									onClick={nextStep}>
									Далее
								</Button>
							</Flex>
						</Flex>
					</>
				) : (
					<Flex
						flexDirection='column'
						my='auto'>
						<Box
							color='green'
							mx='auto'>
							<svg
								width='50px'
								height='50px'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fill='currentColor'
									d='M10 20a10 10 0 0 1 0-20a10 10 0 1 1 0 20m-2-5l9-8.5L15.5 5L8 12L4.5 8.5L3 10z'
								/>
							</svg>
						</Box>
						<Heading
							as='h3'
							fontSize='32px'
							mt='22px'
							textAlign='center'>
							Спасибо за ваши ответы
						</Heading>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}

export default App;
