import { FunctionalComponent, h } from "preact";
import { faqStyles } from "../helpers/theme";
import { QuestionAnswerProps } from "../typings/typings";

export const QuestionAnswer: FunctionalComponent<QuestionAnswerProps> = (props) => {
	return (
		<div style={{ marginTop: "8px", marginBottom: "4px" }}>
			<div style={faqStyles.question}>
				{props.question}
			</div>
			<div>
				{props.answer}
			</div>
		</div>
	);
};