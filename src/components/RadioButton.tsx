import { FormLabel, Radio } from '@chakra-ui/react';
import TooltipBox from './Tooltip';

interface Radio {
	text: string;
	tooltipText?: string | undefined;
	setRadioValue: any;
}

export default function RadioButton({ text, tooltipText, setRadioValue }: Radio) {
	return (
		<FormLabel
			borderWidth='1px'
			borderStyle='solid'
			borderColor='#F2F2F2'
			borderRadius='10px'
			px='30px'
			py='20px'
			cursor='pointer'
			display='flex'
			alignItems='center'>
			<Radio
				value={text}
				onChange={(e) => setRadioValue(e.target.value)}>
				{text}
			</Radio>
			<TooltipBox text={tooltipText} />
		</FormLabel>
	);
}
