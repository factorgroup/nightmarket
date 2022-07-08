import { h } from "preact";
import { QuestionAnswer } from "../components/QuestionAnswer";

export function GuideView () {
	return (
		<div>
			<QuestionAnswer question="What is this?" answer="A market to sell the planets you discovered, without divulging their coordinates up until the sale is carried out." />
			<QuestionAnswer question="Can other players see the coordinates of the planet I bought?" answer="No. Only you and the seller are able to decrypt the planet's coordinates." />
			<QuestionAnswer question="Market/Orders data seems off?" answer="Don't forget to pull fresh data from the contract by clicking 'Refresh' from the 'Market' or 'My Listings' tab." />
			<QuestionAnswer question="How do I sell a planet?" answer="Sell a planet from the 'My Planets' tab. Wait for an order. Confirm any order by clicking on it from the 'Market' or 'My Listings' tab." />
			<QuestionAnswer question="How do I buy a planet?" answer="Select a planet from the 'Market' tab. Click to see its details and place an order. Wait for it to be accepted by the seller."/>
			<QuestionAnswer question="How do I decrypt coordinates?" answer="Go the 'Decrypt' tab. Copy the transaction hash of the planet listing. Paste it in the corresponding input. Copy the transaction hash of the planet sale. Click 'decrypt'." />
		</div>
	);
}
