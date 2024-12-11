export function clickOutside(node) {
	// the node has been mounted in the DOM
	
	window.addEventListener('click', handleClick);
	
	function handleClick(e){   
  if (!node.contains(e.target)){
    node.dispatchEvent(new CustomEvent('on:outsideclick'))
  }
}

	return {
		destroy() {
			// the node has been removed from the DOM
			window.removeEventListener('click', handleClick)
		}
	};
} 

export const texts = [
	`Though Ónåpåna is basically a way of developing
	samatha (tranquillity of mind), samådhi (concentration of
	mind to one-pointedness) and jhåna (absorption states), Ven.
	Webu Sayadaw said that when concentration is developed to
	a sufficient degree, the meditator automatically gains insight
	into the three characteristics of nature, anicca, dukkha, and
	anattå, if his mind is open to recognize them. Anicca means
	“impermanence” or “instability,” “change,” and is character-
	istic of all conditioned phenomena, be they physical or
	mental. Dukkha denotes the unsatisfactory nature of all these
	phenomena : nothing that is impermanent or changing can
	ever give lasting satisfaction. Anattå means “non-self,” “non-
	soul,” and applies to all phenomena — conditioned and
	unconditioned.`,
	`Sankhåra (or kamma in popular terminology) is the force
	left behind by actions in the past, the “past” meaning here
	billions and billions of lives in saµsåra, the cycle of births
	and deaths. Sa!khåra causes us to experience sense impres-
	sions. What we see, hear, taste, smell, feel or think — in
	other words the contact of one of the six organs of sense with
	an object, (mind being regarded as an organ of sense) —
	arises mainly because of the force of past sa!khåra or
	kamma. What is not necessarily connected with our past
	kamma is how we deal with these sense impressions.`,
	`Initially Ónåpåna meditation is but a tool to concentrate
	the mind. At this stage no attention is given to sensations,
	thoughts, emotions, and similar mental phenomena. The
	attention of the mind is meant to stay with the simple aware-
	ness of the physical touch of air brushing over the skin below
	the nose, above the upper lip. In this case the three unwhole-
	some roots, i.e., lobha (greed), dosa (anger, aversion), and
	moha (delusion), are held in abeyance and what is left are the
	Three Wholesome Roots : alobha (non-greed), adosa (non-
	anger), and amoha (knowledge, understanding). This
	momentary concentration of the mind on physical phenom-
	ena results in a temporary mental purity which in Buddhism
	is called samådhi.`,
	`The everyday experiences of forgetting the self in the act of,
	say, fixing a faucet, may be understood as a model for zazen,
	the meditation practice of the Zen student. But before any
	forgetting is possible, there must be a measure of confidence.
	The diver on the high board lets everything go with each dive,
	but could not do so without the development of confidence, a
	development that goes hand in hand with training. Such let-
	ting go is not random. The diver has become one with the
	practice of diving-free, yet at the same time highly dis-
	ciplined.`,
	`Anger is one kind of condition. Bliss is another condition.
	The sensation of transparency is still another, sleepiness an-
	other, and so on. These conditions are only superficial waves of
	the sea of your mind. They are the context of your practice.
	When you are angry, have angry zazen. Just continue to count
	your breaths, just continue to work on your koan, in that blaze
	offeeling. When you are in blissful condition, have blissful
	zazen. When you congratulate yourselfon your blissful condi-
	tion' it disappears immediately. It is simply the nature of the
	shadow that is your environment .`
];

export const images = ['./image-1.png', './image-2.png','./image-3.png','./image-4.png']

export const generateDelay = () => parseFloat((Math.random() * 4.5 + 0.5).toFixed(1));
export const generateId = () => Math.random().toString(16).slice(2);