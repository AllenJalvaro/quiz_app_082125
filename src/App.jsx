import { useState, useEffect } from "react";

const QuizQuestion = ({
  question,
  answerOptions,
  rationale,
  index,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showRationale, setShowRationale] = useState(false);

  const handleAnswerClick = (option, optionIndex) => {
    setSelectedAnswer(optionIndex);
    setShowRationale(true);
    onAnswer(index, option.isCorrect);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{question}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {answerOptions.map((option, optionIndex) => (
          <button
            key={optionIndex}
            onClick={() => handleAnswerClick(option, optionIndex)}
            className={`
              w-full text-left p-4 rounded-lg transition-colors duration-200
              ${selectedAnswer === null ? "bg-gray-100 hover:bg-gray-200" : ""}
              ${
                selectedAnswer !== null && option.isCorrect
                  ? "bg-green-500 text-white"
                  : ""
              }
              ${
                selectedAnswer === optionIndex && !option.isCorrect
                  ? "bg-red-500 text-white"
                  : ""
              }
              ${
                selectedAnswer !== null &&
                !option.isCorrect &&
                selectedAnswer !== optionIndex
                  ? "bg-gray-100 opacity-60"
                  : ""
              }
            `}
            disabled={selectedAnswer !== null}
          >
            {option.text}
          </button>
        ))}
      </div>
      {showRationale && (
        <div className={`mt-4 p-4 rounded-l bg-green-100 text-green-700`}>
          <p className="font-semibold">Rationale:</p>
          <p>{rationale}</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (showResults) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showResults]);
  const [ventureCapitalQuizData] = useState(() =>
    [
      {
        question:
          "Why might entrepreneurs avoid giving pro-rata rights in a SAFE?",
        correct_answer:
          "To avoid dilution management complexities in future rounds",
        incorrect_answer_1: "To guarantee automatic board seats for investors",
        incorrect_answer_2: "To comply with legal requirements",
        incorrect_answer_3: "To accelerate SAFE conversion into debt",
        rationale:
          "Standard SAFEs typically exclude pro-rata rights to keep fundraising flexible and avoid complex cap table management early on.",
      },
      {
        question: "What is a key risk for sellers in an asset deal?",
        correct_answer: "Lingering liabilities in the shell corporation",
        incorrect_answer_1: "Immediate termination of all employees",
        incorrect_answer_2: "Inability to negotiate escrow terms",
        incorrect_answer_3: "Automatic loss of stock options",
        rationale:
          "In asset deals, the seller retains the legal entity, including liabilities, requiring time and cost to wind down.",
      },
      {
        question: "Why were SAFE and KISS instruments created?",
        correct_answer: "To reduce the legal complexities of convertible debt",
        incorrect_answer_1: "To eliminate all investor returns",
        incorrect_answer_2: "To fix interest rates at zero",
        incorrect_answer_3: "To prevent future equity rounds",
        rationale:
          "SAFE and KISS agreements simplify convertible financing and reduce legal risk by not being debt instruments.",
      },
      {
        question: "Why is transparency critical during due diligence?",
        correct_answer: "Hiding issues damages trust with investors",
        incorrect_answer_1: "It reduces the workload of legal teams",
        incorrect_answer_2: "It accelerates product launches",
        incorrect_answer_3: "It ensures more marketing exposure",
        rationale:
          "Being upfront builds trust and prevents problems from arising later in the relationship.",
      },
      {
        question: "What does a discount in a SAFE provide to investors?",
        correct_answer: "Shares at a lower price than future investors",
        incorrect_answer_1: "Immediate board representation",
        incorrect_answer_2: "Guaranteed returns on investment",
        incorrect_answer_3: "Debt priority in liquidation",
        rationale:
          "A discount gives investors a better price per share compared to new investors in the next financing round.",
      },
      {
        question: "Who are Super Angels?",
        correct_answer:
          "Highly active individual investors often investing their own money in many startups",
        incorrect_answer_1: "VC partners managing multi-million-dollar funds",
        incorrect_answer_2: "Junior analysts in venture firms",
        incorrect_answer_3: "Corporate lawyers specializing in VC deals",
        rationale:
          "Super Angels are experienced entrepreneurs or investors deploying personal capital across many startups.",
      },

      {
        question:
          "What is the main purpose of a term sheet in venture capital deals?",
        correct_answer:
          "To outline the key terms and conditions of the investment before drafting final agreements",
        incorrect_answer_1: "To provide legally binding ownership transfers",
        incorrect_answer_2: "To register the company with the SEC",
        incorrect_answer_3: "To finalize tax compliance requirements",
        rationale:
          "A term sheet summarizes agreed terms and sets the framework for final legal agreements.",
      },
      {
        question: "Why have modern term sheets become longer and more complex?",
        correct_answer: "To cover more provisions beyond price and ownership",
        incorrect_answer_1: "To make the process faster",
        incorrect_answer_2: "To reduce legal fees",
        incorrect_answer_3: "To simplify negotiations",
        rationale:
          "Modern term sheets include multiple provisions covering governance, rights, and protections for investors.",
      },
      {
        question:
          "What is the main difference between cumulative and non-cumulative dividends in a term sheet?",
        correct_answer:
          "Cumulative dividends accrue annually even if not declared.",
        incorrect_answer_1: "Non-cumulative dividends accrue annually.",
        incorrect_answer_2:
          "Cumulative dividends are paid only if declared by the Board.",
        incorrect_answer_3:
          "Both types of dividends are automatically paid in cash.",
        rationale:
          "Cumulative dividends build up over time, while non-cumulative only pay if declared.",
      },
      {
        question: "Why is it important for entrepreneurs to research VC firms?",
        correct_answer:
          "To understand their hierarchy and decision-making process",
        incorrect_answer_1: "To secure government grants",
        incorrect_answer_2: "To prepare tax returns accurately",
        incorrect_answer_3: "To evaluate office locations",
        rationale:
          "Knowing the VC firm's structure helps entrepreneurs approach the right decision-makers.",
      },
      {
        question:
          "What is a key disadvantage of a 'party round' during seed funding?",
        correct_answer:
          "Lack of focused attention and commitment from investors",
        incorrect_answer_1:
          "Too much control concentrated with a single investor",
        incorrect_answer_2: "Automatic dilution of common stockholders",
        incorrect_answer_3:
          "Immediate requirement for a board seat for each investor",
        rationale:
          "Party rounds distribute responsibility among many investors, often reducing commitment and support.",
      },
      {
        question: "What is the most effective way to get connected with a VC?",
        correct_answer: "Through referrals and warm introductions",
        incorrect_answer_1: "Cold emailing multiple firms blindly",
        incorrect_answer_2: "Posting frequently on social media",
        incorrect_answer_3: "Waiting for inbound interest",
        rationale:
          "Referrals from trusted connections are the most effective way to start a VC conversation.",
      },
      {
        question: "Which is a disadvantage of SAFE for investors?",
        correct_answer: "No debt protections or guaranteed returns",
        incorrect_answer_1: "Mandatory interest payments from the company",
        incorrect_answer_2: "Automatic conversion into cash",
        incorrect_answer_3: "Fixed ownership percentages upon signing",
        rationale:
          "Investors lack debt priority, interest, and fixed ownership until the next priced round.",
      },
      {
        question:
          "What is the usual stock type issued to founders at company formation?",
        correct_answer: "Common Stock",
        incorrect_answer_1: "Preferred Stock",
        incorrect_answer_2: "Series Seed",
        incorrect_answer_3: "Convertible Notes",
        rationale:
          "Founders typically hold common stock, while investors receive preferred stock.",
      },
      {
        question:
          "Why are seed deals considered high risk despite having the lowest legal costs?",
        correct_answer:
          "Because they can set precedents that impact future financings",
        incorrect_answer_1: "Because they always result in high valuations",
        incorrect_answer_2: "Because they involve complex board structures",
        incorrect_answer_3: "Because they require multiple rounds of approvals",
        rationale:
          "Seed deals may establish terms that carry into future rounds, affecting later negotiations and dynamics.",
      },
      {
        question:
          "What is the primary feature of convertible debt in early-stage financing?",
        correct_answer:
          "It converts into equity during a future financing round",
        incorrect_answer_1: "It permanently remains as a loan",
        incorrect_answer_2: "It provides voting control from day one",
        incorrect_answer_3: "It eliminates dilution risk",
        rationale:
          "Convertible debt is a loan that later converts into equity, usually during a priced financing round.",
      },
      {
        question:
          "How is the Voting Agreement related to the Stock Purchase Agreement (SPA)?",
        correct_answer:
          "It is executed alongside the SPA to secure governance and control terms",
        incorrect_answer_1:
          "It replaces the SPA as the main financing document",
        incorrect_answer_2: "It is filed with state regulators for approval",
        incorrect_answer_3: "It dictates the company's day-to-day operations",
        rationale:
          "The Voting Agreement complements the SPA by handling control and governance terms.",
      },
      {
        question:
          "What type of stock is most commonly issued to venture capital investors?",
        correct_answer: "Preferred stock",
        incorrect_answer_1: "Common stock",
        incorrect_answer_2: "Restricted stock",
        incorrect_answer_3: "Employee stock options",
        rationale:
          "VC investors typically receive preferred stock for its special rights and protections.",
      },
      {
        question:
          "What is a primary challenge for founders in mid- and late-stage rounds?",
        correct_answer: "Losing control of the board",
        incorrect_answer_1: "Negotiating a lower valuation",
        incorrect_answer_2: "Avoiding participation rights",
        incorrect_answer_3: "Meeting interest payment obligations",
        rationale:
          "As more investors join, board seats expand, often reducing founders' influence and decision-making control.",
      },
      {
        question: "What is the primary purpose of a Corporate Charter?",
        correct_answer:
          "To legally create a corporation and establish its basic structure",
        incorrect_answer_1: "To outline employment policies",
        incorrect_answer_2: "To manage daily operations",
        incorrect_answer_3: "To prepare annual financial reports",
        rationale:
          "A Corporate Charter establishes the legal existence and structure of a corporation.",
      },
      {
        question:
          "What is the main function of a lead investor in a syndicate?",
        correct_answer: "Negotiating terms for the entire group of investors",
        incorrect_answer_1: "Managing the company’s payroll",
        incorrect_answer_2: "Serving as the company’s legal counsel",
        incorrect_answer_3: "Conducting employee performance reviews",
        rationale:
          "The lead investor negotiates deal terms on behalf of the group, simplifying the process for the entrepreneur.",
      },
      {
        question: "What is the impact of rounding errors in a cap table?",
        correct_answer:
          "They can accumulate and distort ownership calculations",
        incorrect_answer_1: "They have no impact on equity percentages",
        incorrect_answer_2: "They improve accuracy automatically",
        incorrect_answer_3: "They only affect legal documents",
        rationale:
          "Even minor rounding errors can lead to significant discrepancies in ownership tracking.",
      },
      {
        question:
          "Why should entrepreneurs be cautious with private company stock as consideration?",
        correct_answer:
          "It may be illiquid and have complex capital structures",
        incorrect_answer_1: "It automatically appreciates after acquisition",
        incorrect_answer_2: "It is guaranteed to be freely tradable",
        incorrect_answer_3: "It eliminates escrow requirements",
        rationale:
          "Private stock can be hard to value and sell, and its terms may include restrictions and preferences.",
      },
      {
        question:
          "What risk do separate class votes on protective provisions create?",
        correct_answer: "Multiple veto points, complicating decision-making",
        incorrect_answer_1: "Automatic conversion of shares",
        incorrect_answer_2: "Immediate dilution of preferred shares",
        incorrect_answer_3: "Inability to conduct party rounds",
        rationale:
          "Separate class votes give each class veto power, complicating approvals and slowing decisions.",
      },
      {
        question:
          "What is a key value of having a mentor in venture financing?",
        correct_answer: "Providing advice and connections without formal fees",
        incorrect_answer_1: "Managing the company’s financial statements",
        incorrect_answer_2: "Handling day-to-day marketing tasks",
        incorrect_answer_3: "Filing annual compliance reports",
        rationale:
          "Mentors offer guidance and often connections to VCs, typically without formal compensation.",
      },
      {
        question:
          "What unique risk is associated with later-stage investors' final approvals?",
        correct_answer:
          "Deals can collapse after the term sheet due to internal committee rejections",
        incorrect_answer_1: "Investors immediately demand liquidation",
        incorrect_answer_2: "Early investors lose their pro-rata rights",
        incorrect_answer_3:
          "Founders are forced to accept party round dynamics",
        rationale:
          "Later-stage deals often require final internal approvals, which can kill or delay agreements.",
      },
      {
        question:
          "What should entrepreneurs avoid disclosing during competitive fundraising?",
        correct_answer: "The names of other VCs they are speaking with",
        incorrect_answer_1: "Their product demo link",
        incorrect_answer_2: "The estimated burn rate",
        incorrect_answer_3: "Their customer pipeline",
        rationale:
          "Keeping other investors' names confidential prevents collaboration that could disadvantage the entrepreneur.",
      },
      {
        question:
          "Why can excessively high valuations in later rounds be problematic?",
        correct_answer: "They create misalignment and can hinder exits",
        incorrect_answer_1: "They guarantee automatic liquidation preferences",
        incorrect_answer_2: "They simplify board dynamics",
        incorrect_answer_3: "They prevent the use of pro-rata rights",
        rationale:
          "High valuations can pressure investors to hold out for unrealistic exits, causing alignment issues.",
      },
      {
        question:
          "In the example provided, what is the VC's ownership percentage post-money for a $5M investment in a $10M pre-money valuation?",
        correct_answer: "33.33%",
        incorrect_answer_1: "25%",
        incorrect_answer_2: "20%",
        incorrect_answer_3: "50%",
        rationale:
          "The VC owns one-third of the company because $5M/$15M = 33.33%.",
      },
      {
        question:
          "What is the purpose of a proprietary information and inventions agreement?",
        correct_answer:
          "To ensure the company owns all intellectual property created by employees.",
        incorrect_answer_1:
          "To give employees ownership of their work regardless of contracts.",
        incorrect_answer_2:
          "To allow third parties to use the company’s intellectual property freely.",
        incorrect_answer_3: "To assign patents only to senior management.",
        rationale:
          "This agreement protects the company's ownership of its IP, which is critical during financings and acquisitions.",
      },
      {
        question: "What typically happens after a term sheet is signed?",
        correct_answer:
          "Drafting definitive documents and closing the financing",
        incorrect_answer_1: "Public announcement of IPO",
        incorrect_answer_2: "Immediate wire of funds without paperwork",
        incorrect_answer_3: "End of the fundraising process entirely",
        rationale:
          "Signing the term sheet initiates the drafting of final documents and leads to fund disbursement.",
      },
      {
        question:
          "Why do founders prefer using Convertible Notes during seed rounds?",
        correct_answer: "It defers setting a precise company valuation upfront",
        incorrect_answer_1:
          "It guarantees higher equity ownership for founders",
        incorrect_answer_2: "It eliminates the need for legal agreements",
        incorrect_answer_3:
          "It immediately provides pro-rata rights to investors",
        rationale:
          "Convertible Notes delay valuation discussions until a priced round, avoiding early-stage valuation disputes.",
      },
      {
        question: "What is the liquidation preference in a term sheet?",
        correct_answer:
          "The order in which investors get paid during a liquidation event",
        incorrect_answer_1: "The valuation agreed in the funding round",
        incorrect_answer_2: "The voting rights assigned to common stockholders",
        incorrect_answer_3: "The minimum shareholding of founders",
        rationale:
          "Liquidation preference determines payout priority for investors in case of company sale or liquidation.",
      },
      {
        question:
          "Who typically has the right to elect Preferred Stock Directors under a Voting Agreement?",
        correct_answer: "Investors holding preferred stock",
        incorrect_answer_1: "Common stockholders",
        incorrect_answer_2: "The company's legal counsel",
        incorrect_answer_3: "Independent board members",
        rationale:
          "Preferred stockholders gain the right to elect specific board members.",
      },
      {
        question:
          "Who is considered the core of the startup ecosystem in a venture deal?",
        correct_answer: "The Entrepreneur",
        incorrect_answer_1: "The Venture Capitalist",
        incorrect_answer_2: "The Angel Investor",
        incorrect_answer_3: "The Mentor",
        rationale:
          "The entrepreneur is central because they lead the financing process and drive the company's vision.",
      },
      {
        question:
          "What does the 'Obligation to Vote' clause in a Voting Agreement mean?",
        correct_answer:
          "Shareholders must vote their shares to elect the agreed directors",
        incorrect_answer_1: "Shareholders can abstain from board elections",
        incorrect_answer_2: "Only investors need to follow this obligation",
        incorrect_answer_3: "It limits shareholders' voting rights entirely",
        rationale:
          "This clause ensures voting compliance for agreed board seats.",
      },
      {
        question:
          "How does automatic conversion of Convertible Notes typically occur?",
        correct_answer: "When a qualified financing round is completed",
        incorrect_answer_1: "Immediately upon signing the agreement",
        incorrect_answer_2: "After company reaches profitability",
        incorrect_answer_3: "At the discretion of the noteholder only",
        rationale:
          "Automatic conversion happens when a predefined qualified financing round is closed.",
      },
      {
        question:
          "Which clause prevents the company from negotiating with other investors during a funding round?",
        correct_answer: "No-Shop Agreement",
        incorrect_answer_1: "Co-Sale Agreement",
        incorrect_answer_2: "Right of First Refusal",
        incorrect_answer_3: "Assignment Clause",
        rationale:
          "A no-shop clause ensures exclusivity with the lead investor during negotiations.",
      },
      {
        question:
          "What does 'revesting' of stock options typically require from employees?",
        correct_answer: "Re-earning equity over a new vesting schedule",
        incorrect_answer_1: "Selling their equity at a discount",
        incorrect_answer_2: "Automatic conversion to cash bonuses",
        incorrect_answer_3: "Exemption from future performance requirements",
        rationale:
          "Revesting means employees must vest their equity again under new conditions post-acquisition.",
      },
      {
        question: "Which is an advantage of SAFE for entrepreneurs?",
        correct_answer: "No debt obligations or maturity pressure",
        incorrect_answer_1: "Immediate valuation certainty",
        incorrect_answer_2: "Guaranteed investor board seats",
        incorrect_answer_3: "Automatic pro-rata rights for all investors",
        rationale:
          "SAFEs eliminate debt complexities and pressure from maturity dates, allowing founders to focus on growth.",
      },
      {
        question:
          "Which type of VC fund typically has less than $15 million per fund and invests only at the seed stage?",
        correct_answer: "Micro VC Fund",
        incorrect_answer_1: "Late-Stage Fund",
        incorrect_answer_2: "Growth Fund",
        incorrect_answer_3: "Mid-Stage Fund",
        rationale:
          "Micro VCs are small funds focused on early-stage investments, typically under $15 million.",
      },
      {
        question: "Which vesting acceleration is most common in venture deals?",
        correct_answer: "Double-trigger acceleration",
        incorrect_answer_1: "Single-trigger acceleration",
        incorrect_answer_2: "Immediate full vesting at signing",
        incorrect_answer_3: "No vesting acceleration allowed.",
        rationale:
          "Double-trigger acceleration requires both an acquisition and termination, aligning incentives for a smooth post-acquisition transition.",
      },
      {
        question:
          "What are the two core concepts that truly matter to VCs in term sheets?",
        correct_answer: "Economics and Control",
        incorrect_answer_1: "Marketing and Branding",
        incorrect_answer_2: "Recruitment and Training",
        incorrect_answer_3: "Technology and Innovation",
        rationale:
          "Economics and control dictate the financial returns and the level of influence VCs have in the company.",
      },
      {
        question: "What type of stock do VCs typically purchase?",
        correct_answer: "Preferred Stock",
        incorrect_answer_1: "Common Stock",
        incorrect_answer_2: "Restricted Stock Units",
        incorrect_answer_3: "Convertible Bonds",
        rationale:
          "VCs almost always purchase preferred stock, which comes with special rights and preferences.",
      },
      {
        question:
          "Why is a valuation cap in a convertible instrument beneficial to early investors?",
        correct_answer:
          "It allows conversion at a more favorable price in future rounds",
        incorrect_answer_1: "It guarantees immediate liquidity at exit",
        incorrect_answer_2: "It prevents additional financing rounds",
        incorrect_answer_3: "It removes all risk from the investment",
        rationale:
          "A cap sets a maximum conversion price, protecting early investors from high valuations that could dilute their stake.",
      },
      {
        question: "Why do investors negotiate redemption rights?",
        correct_answer:
          "To ensure a liquidity path if the company doesn’t IPO or get acquired.",
        incorrect_answer_1: "To reduce their equity ownership over time.",
        incorrect_answer_2:
          "To eliminate voting rights for common shareholders.",
        incorrect_answer_3: "To guarantee dividends are declared annually.",
        rationale:
          "Redemption rights give investors an exit option if other liquidity events don't occur.",
      },
      {
        question:
          "Why is having outside board members beneficial for a startup?",
        correct_answer: "They bring impartiality and diverse perspectives",
        incorrect_answer_1: "They increase founder control",
        incorrect_answer_2: "They reduce investor influence completely",
        incorrect_answer_3: "They guarantee higher company valuation",
        rationale:
          "Outside members provide unbiased advice and enhance balanced decision-making.",
      },
      {
        question: "Which part of the LOI is typically binding?",
        correct_answer: "No-shop and confidentiality provisions",
        incorrect_answer_1: "The purchase price",
        incorrect_answer_2: "Board representation terms",
        incorrect_answer_3: "Employee retention packages",
        rationale:
          "LOIs are mostly non-binding except for clauses like no-shop and confidentiality that restrict actions during negotiations.",
      },
      {
        question: "What does a valuation cap protect early investors from?",
        correct_answer:
          "Excessive dilution if company valuation increases significantly",
        incorrect_answer_1: "Paying high interest rates on their investment",
        incorrect_answer_2: "Being forced into immediate conversion",
        incorrect_answer_3: "Losing voting rights in future rounds",
        rationale:
          "A valuation cap sets a maximum price for conversion, protecting early investors from dilution in high-valued rounds.",
      },
      {
        question:
          "What does the MFN (Most Favored Nation) clause ensure for noteholders?",
        correct_answer:
          "They receive any better terms offered in subsequent notes",
        incorrect_answer_1: "They automatically become board members",
        incorrect_answer_2: "They skip the interest accrual phase",
        incorrect_answer_3: "They convert to equity without a financing round",
        rationale:
          "MFN clauses ensure investors aren't disadvantaged if better terms are offered in future note issuances.",
      },
      {
        question:
          "What does a Right of First Refusal (ROFR) grant an investor?",
        correct_answer:
          "The right to buy shares in future financings to maintain ownership percentage.",
        incorrect_answer_1: "The right to veto board decisions.",
        incorrect_answer_2:
          "The ability to convert preferred stock into common shares.",
        incorrect_answer_3: "Automatic rights to demand dividends.",
        rationale:
          "ROFR ensures investors can participate in future funding rounds to avoid dilution.",
      },

      {
        question:
          "What is the recommended approach when working with lawyers in VC financing?",
        correct_answer: "Choose an experienced lawyer and insist on fee caps",
        incorrect_answer_1: "Avoid using lawyers to save money",
        incorrect_answer_2: "Let the VC choose the lawyer for you",
        incorrect_answer_3: "Focus only on non-critical terms",
        rationale:
          "An experienced lawyer helps secure fair terms, and fee caps prevent excessive legal costs.",
      },
      {
        question:
          "Why might a financing round be labeled as Series A-1 or B-2?",
        correct_answer:
          "To indicate additional funding within an existing series",
        incorrect_answer_1: "To signal a company's bankruptcy",
        incorrect_answer_2: "To prepare for an IPO",
        incorrect_answer_3: "To differentiate between different industries",
        rationale:
          "Numbered extensions like Series A-1 indicate additional funding rounds under similar terms without advancing the series letter.",
      },
      {
        question:
          "What happens in a fully participating liquidation preference?",
        correct_answer:
          "Investors receive their preference and then share in the remaining proceeds as common shareholders.",
        incorrect_answer_1:
          "Investors must choose between preference and common stock.",
        incorrect_answer_2: "Common shareholders get paid first.",
        incorrect_answer_3: "Preferred stock automatically converts to common.",
        rationale:
          "Fully participating preferred lets investors collect their preference and still share pro-rata in remaining proceeds.",
      },
      {
        question:
          "What is a common trap regarding employee option pools in valuations?",
        correct_answer:
          "VCs often push to calculate the pool from the pre-money valuation.",
        incorrect_answer_1: "Entrepreneurs typically overestimate the pool.",
        incorrect_answer_2: "Option pools have no effect on valuation.",
        incorrect_answer_3: "Employees own the pool outright.",
        rationale:
          "If the pool is calculated pre-money, it effectively lowers the founder's ownership percentage.",
      },
      {
        question: "What is a common purpose of an escrow in acquisition deals?",
        correct_answer:
          "To cover potential breaches of representations and warranties",
        incorrect_answer_1: "To pay for employee retention bonuses",
        incorrect_answer_2: "To cover future product development costs",
        incorrect_answer_3: "To buy out minority shareholders",
        rationale:
          "Escrow funds are held to protect the buyer in case of breaches of reps and warranties after closing.",
      },
      {
        question: "What is a key drawback of SAFE/KISS for investors?",
        correct_answer: "Lack of explicit pro-rata rights unless negotiated",
        incorrect_answer_1: "Guaranteed dilution protection",
        incorrect_answer_2: "Higher default interest rates",
        incorrect_answer_3: "Mandatory immediate conversion",
        rationale:
          "SAFE and KISS do not inherently provide pro-rata rights, limiting investor participation unless explicitly added.",
      },
      {
        question:
          "What is the role of the Incorporator listed in a Corporate Charter?",
        correct_answer: "To sign and file the Articles of Incorporation",
        incorrect_answer_1: "To manage company finances",
        incorrect_answer_2: "To oversee employee relations",
        incorrect_answer_3: "To lead the product development team",
        rationale:
          "Incorporators perform the ministerial task of filing the charter during formation.",
      },
      {
        question: "What does 'control' refer to in a term sheet?",
        correct_answer:
          "Mechanisms that allow investors to influence decisions",
        incorrect_answer_1: "The number of employees hired",
        incorrect_answer_2: "The company's product roadmap",
        incorrect_answer_3: "Market share percentage",
        rationale:
          "Control ensures VCs can influence major company decisions and protect their investment.",
      },
      {
        question:
          "What is the standard liquidation preference in early-stage deals?",
        correct_answer: "1x non-participating preferred",
        incorrect_answer_1: "2x participating preferred",
        incorrect_answer_2: "3x capped participation",
        incorrect_answer_3: "Full ratchet preferred.",
        rationale:
          "1x non-participating preferred is most common as it provides fair downside protection without excessive investor advantage.",
      },
      {
        question:
          "What overall approach should entrepreneurs take across financing stages?",
        correct_answer:
          "Proactively address stage-specific issues to maintain flexibility",
        incorrect_answer_1: "Negotiate only with late-stage investors",
        incorrect_answer_2: "Avoid legal counsel during negotiations",
        incorrect_answer_3: "Always accept the highest valuation offered",
        rationale:
          "Addressing stage-specific issues early builds a resilient capital structure and smoother growth trajectory.",
      },
      {
        question:
          "What do information rights typically grant investors access to?",
        correct_answer: "Financial statements and operational data.",
        incorrect_answer_1: "Board voting control.",
        incorrect_answer_2: "Automatic share repurchase rights.",
        incorrect_answer_3: "Preferred stock conversion privileges.",
        rationale:
          "Information rights allow investors to monitor the company’s performance through data access.",
      },
      {
        question:
          "What is the key takeaway for managing protective provisions during early financing?",
        correct_answer:
          "Ensure a single class vote across all preferred stockholders",
        incorrect_answer_1: "Allow separate votes for each preferred series",
        incorrect_answer_2: "Avoid granting any protective provisions",
        incorrect_answer_3:
          "Tie protective provisions only to revenue milestones",
        rationale:
          "Single class votes simplify governance and prevent multiple veto points in later stages.",
      },
      {
        question:
          "What is the primary purpose of a Convertible Note in early-stage financing?",
        correct_answer:
          "To provide short-term debt that converts into equity later",
        incorrect_answer_1: "To grant immediate equity without conditions",
        incorrect_answer_2: "To act as a permanent loan without conversion",
        incorrect_answer_3: "To replace venture capital in Series A rounds",
        rationale:
          "A Convertible Note is a loan that converts into equity during a future financing round, making it a flexible early-stage funding tool.",
      },
      {
        question:
          "What does the 'Board Size' provision in a Voting Agreement establish?",
        correct_answer: "The fixed number of directors on the company's board",
        incorrect_answer_1: "The number of shares authorized for issuance",
        incorrect_answer_2: "The company's revenue goals for the year",
        incorrect_answer_3: "The process for granting stock options",
        rationale:
          "The provision sets a fixed number of board members to maintain balance and control.",
      },
      {
        question: "What does 'Series Seed' refer to?",
        correct_answer: "A very early-stage investment round before Series A",
        incorrect_answer_1: "A late-stage funding round",
        incorrect_answer_2: "A convertible debt instrument",
        incorrect_answer_3: "An IPO preparation round",
        rationale:
          "Series Seed is a newer designation for very early rounds of financing, preceding Series A.",
      },
      {
        question: "What is the function of a drag-along agreement?",
        correct_answer:
          "To compel certain shareholders to vote in alignment with majority investors",
        incorrect_answer_1: "To guarantee anti-dilution rights for investors",
        incorrect_answer_2: "To establish vesting schedules for employees",
        incorrect_answer_3:
          "To prevent automatic conversion of preferred stock",
        rationale:
          "Drag-along agreements prevent minority shareholders from blocking significant transactions like company sales.",
      },
      {
        question: "Who created the SAFE instrument?",
        correct_answer: "Y Combinator",
        incorrect_answer_1: "Sequoia Capital",
        incorrect_answer_2: "Andreessen Horowitz",
        incorrect_answer_3: "SoftBank",
        rationale:
          "The SAFE was introduced by Y Combinator as an alternative to convertible debt.",
      },
      {
        question: "How does the employee option pool impact company valuation?",
        correct_answer:
          "A larger pool reduces the effective pre-money valuation for founders.",
        incorrect_answer_1: "It increases the pre-money valuation.",
        incorrect_answer_2: "It has no impact on ownership dilution.",
        incorrect_answer_3: "It guarantees a higher post-money valuation.",
        rationale:
          "Since the pool is often included pre-money, it dilutes existing shareholders and reduces the founders' ownership.",
      },
      {
        question:
          "What does 'vesting' ensure for startup employees or founders?",
        correct_answer:
          "They earn their equity over time based on continued service",
        incorrect_answer_1:
          "They get their full equity grant immediately upon signing",
        incorrect_answer_2: "They cannot sell any shares under any conditions",
        incorrect_answer_3: "They have guaranteed dividend payouts annually",
        rationale:
          "Vesting aligns incentives, granting equity gradually to encourage commitment and performance.",
      },
      {
        question: "When does a SAFE typically convert into equity?",
        correct_answer: "During a future priced equity financing round",
        incorrect_answer_1: "Immediately after signing the agreement",
        incorrect_answer_2: "Upon company profitability",
        incorrect_answer_3: "At the founder's discretion",
        rationale:
          "A SAFE converts into equity when the company raises a priced financing round.",
      },
      {
        question:
          "Why is aligning terms across investor classes important in early-stage deals?",
        correct_answer: "To simplify future financing and governance",
        incorrect_answer_1: "To avoid issuing convertible debt",
        incorrect_answer_2: "To guarantee higher valuations in later rounds",
        incorrect_answer_3: "To automatically grant founders more equity",
        rationale:
          "Consistent terms prevent complex negotiations and governance issues in future financing rounds.",
      },
      {
        question:
          "What is the primary role of the Board of Directors in a venture-backed company?",
        correct_answer:
          "To provide strategic guidance and make key company decisions",
        incorrect_answer_1: "To manage daily operational tasks",
        incorrect_answer_2: "To oversee employee hiring only",
        incorrect_answer_3: "To handle product development exclusively",
        rationale:
          "The board shapes the strategic direction of the company and oversees high-level decisions, not daily operations.",
      },
      {
        question:
          "What is the main purpose of a term sheet in venture capital?",
        correct_answer: "To outline proposed investment terms",
        incorrect_answer_1: "To register the company with the SEC",
        incorrect_answer_2: "To create a marketing plan for investors",
        incorrect_answer_3: "To establish employee contracts",
        rationale:
          "A term sheet summarizes the key terms and conditions of a proposed investment deal.",
      },
      {
        question:
          "Why is understanding a Voting Agreement important for entrepreneurs?",
        correct_answer:
          "It clarifies control dynamics and board governance structures",
        incorrect_answer_1:
          "It provides insight into customer acquisition strategies",
        incorrect_answer_2: "It helps prepare quarterly financial projections",
        incorrect_answer_3: "It replaces the need for employment agreements",
        rationale:
          "The Voting Agreement defines governance terms and control, which founders must understand.",
      },
      {
        question:
          "What does the 'Authorized Shares' section specify in a Corporate Charter?",
        correct_answer: "The maximum number of shares a corporation can issue",
        incorrect_answer_1: "The total revenue target",
        incorrect_answer_2: "Employee stock options granted",
        incorrect_answer_3: "Investor voting rights",
        rationale:
          "Authorized Shares define the ceiling for issuing equity without amendments to the charter.",
      },
      {
        question: "What is the purpose of a valuation cap in a SAFE?",
        correct_answer: "To protect early investors from excessive dilution",
        incorrect_answer_1: "To guarantee immediate liquidity",
        incorrect_answer_2: "To limit company fundraising options",
        incorrect_answer_3: "To fix the company's valuation permanently",
        rationale:
          "A valuation cap ensures SAFE investors convert their investment at a favorable price if the company's valuation grows significantly.",
      },
      {
        question:
          "When does automatic conversion of preferred stock usually occur?",
        correct_answer: "Upon a qualified IPO",
        incorrect_answer_1: "When the founder resigns",
        incorrect_answer_2: "When a new funding round closes",
        incorrect_answer_3: "Upon board member replacement",
        rationale:
          "Preferred stock automatically converts to common stock when a qualified IPO triggers the provision.",
      },
      {
        question:
          "What risk do maturity dates pose to startups using Convertible Notes?",
        correct_answer:
          "Obligation to repay the debt if conversion hasn't occurred",
        incorrect_answer_1: "Automatic company dissolution",
        incorrect_answer_2: "Permanent equity freeze",
        incorrect_answer_3: "Immediate Series B round requirement",
        rationale:
          "If a financing round hasn't occurred by the maturity date, the debt becomes payable, creating financial strain.",
      },
      {
        question:
          "Why do founders often prefer convertible debt at the seed stage?",
        correct_answer: "It avoids upfront valuation negotiations",
        incorrect_answer_1: "It guarantees higher valuations in the next round",
        incorrect_answer_2: "It eliminates the need for legal documentation",
        incorrect_answer_3: "It prevents dilution entirely",
        rationale:
          "Convertible debt defers valuation discussions, making early fundraising simpler and faster.",
      },
      {
        question:
          "What is the primary purpose of a Voting Agreement in venture capital deals?",
        correct_answer:
          "To ensure board composition and align shareholder votes on key matters",
        incorrect_answer_1:
          "To set the company's valuation during funding rounds",
        incorrect_answer_2: "To manage employee stock option plans",
        incorrect_answer_3: "To prepare annual financial statements",
        rationale:
          "A Voting Agreement ensures agreed board composition and voting alignment for governance.",
      },
      {
        question:
          "Which law is commonly specified as governing law in a Voting Agreement?",
        correct_answer: "Delaware law",
        incorrect_answer_1: "California law",
        incorrect_answer_2: "Federal corporate law",
        incorrect_answer_3: "Nevada law",
        rationale:
          "Delaware is often chosen for its robust corporate legal framework.",
      },
      {
        question:
          "What is a key takeaway when navigating the VC-founder relationship?",
        correct_answer: "It often lasts longer than a marriage",
        incorrect_answer_1: "It is typically a short, transactional engagement",
        incorrect_answer_2: "It doesn’t require much communication",
        incorrect_answer_3: "It ends after the first board meeting",
        rationale:
          "The VC-founder relationship is a long-term partnership requiring mutual trust and alignment.",
      },
      {
        question: "What does SAFE stand for in venture financing?",
        correct_answer: "Simple Agreement for Future Equity",
        incorrect_answer_1: "Simple Allocation for Founders and Employees",
        incorrect_answer_2: "Structured Agreement for Future Earnings",
        incorrect_answer_3: "Share Allocation for Fundraising Equity",
        rationale:
          "SAFE stands for Simple Agreement for Future Equity, a financing tool that grants investors future equity without being debt.",
      },
      {
        question: "Why is understanding the cap table crucial for founders?",
        correct_answer:
          "It helps them make informed decisions about dilution and valuation",
        incorrect_answer_1: "It simplifies their tax filings",
        incorrect_answer_2: "It eliminates the need for lawyers",
        incorrect_answer_3: "It guarantees higher valuations",
        rationale:
          "Understanding dilution and valuation empowers founders during negotiations.",
      },

      {
        question: "What does a capitalization table primarily summarize?",
        correct_answer:
          "Who owns what part of the company before and after financing rounds",
        incorrect_answer_1: "The company's revenue streams",
        incorrect_answer_2: "Employee satisfaction levels",
        incorrect_answer_3: "Only the founder's equity",
        rationale:
          "A cap table is a detailed summary of ownership stakes pre- and post-financing.",
      },
      {
        question:
          "Which of the following is typically NOT included in a term sheet?",
        correct_answer: "Company tax return summaries",
        incorrect_answer_1: "Valuation of the company",
        incorrect_answer_2: "Investor rights",
        incorrect_answer_3: "Board structure",
        rationale:
          "Tax returns are not part of a term sheet; it focuses on valuation, rights, and structure details.",
      },
      {
        question: "Why might valuation caps be controversial for founders?",
        correct_answer:
          "They can act as an unintended ceiling on company valuation in future rounds",
        incorrect_answer_1: "They automatically remove investor rights",
        incorrect_answer_2: "They eliminate all future discounts",
        incorrect_answer_3: "They prevent company expansion",
        rationale:
          "A cap can anchor the next round's valuation lower than expected, limiting negotiation flexibility for founders.",
      },
      {
        question:
          "Why did drag-along provisions become common after the dot-com bust of 2001?",
        correct_answer:
          "To prevent founders from blocking low-value company sales",
        incorrect_answer_1: "To increase the size of employee option pools",
        incorrect_answer_2: "To reduce investor involvement in governance",
        incorrect_answer_3: "To eliminate the need for preferred stock classes",
        rationale:
          "Drag-along provisions ensured smoother sale processes when companies were sold below liquidation preference.",
      },
      {
        question: "What is the main legal risk of using convertible debt?",
        correct_answer:
          "Shift of fiduciary duty to creditors if the company becomes insolvent",
        incorrect_answer_1: "Permanent voting control for founders",
        incorrect_answer_2: "Immediate dilution of investors",
        incorrect_answer_3: "Automatic termination of board rights",
        rationale:
          "Convertible debt creates a creditor relationship, shifting fiduciary duties if the company becomes insolvent.",
      },
      {
        question:
          "What is the primary purpose of a Letter of Intent (LOI) in an acquisition?",
        correct_answer:
          "To summarize the principal terms of a possible acquisition",
        incorrect_answer_1: "To finalize all legal agreements",
        incorrect_answer_2: "To transfer ownership of shares immediately",
        incorrect_answer_3: "To establish post-acquisition employee benefits",
        rationale:
          "The LOI outlines key terms before the definitive agreements are drafted, providing a framework for negotiations.",
      },
      {
        question:
          "Why should entrepreneurs avoid giving a range when stating how much money they are raising?",
        correct_answer: "It signals uncertainty and lack of planning",
        incorrect_answer_1: "It helps attract more investors",
        incorrect_answer_2: "It ensures faster term sheet approval",
        incorrect_answer_3: "It avoids dilution",
        rationale:
          "Giving a range suggests hedging and uncertainty; a specific figure shows clarity and confidence.",
      },
      {
        question:
          "Why are anti-dilution provisions important in venture capital?",
        correct_answer:
          "They protect investors from value dilution during future financing rounds",
        incorrect_answer_1:
          "They prevent employees from exercising stock options",
        incorrect_answer_2: "They limit company valuations from increasing",
        incorrect_answer_3: "They guarantee founders retain full control",
        rationale:
          "Anti-dilution provisions shield investors when future rounds are priced lower than prior rounds.",
      },
      {
        question: "What is a Pre-Seed round?",
        correct_answer: "An investment stage even earlier than a Seed Round",
        incorrect_answer_1: "A mid-stage investment for growth",
        incorrect_answer_2: "A late-stage round before IPO",
        incorrect_answer_3: "A round exclusively for accredited investors",
        rationale:
          "Pre-Seed rounds provide very early funding before the Seed stage.",
      },
      {
        question: "What does 'pro-rata rights' allow an investor to do?",
        correct_answer:
          "Maintain their ownership percentage in future financing rounds",
        incorrect_answer_1: "Take over board control automatically",
        incorrect_answer_2: "Force the company into IPO",
        incorrect_answer_3: "Prevent employee stock option grants",
        rationale:
          "Pro-rata rights let investors purchase more shares to keep their ownership percentage constant.",
      },

      {
        question: "What does a '1x liquidation preference' mean?",
        correct_answer:
          "Investors get their original investment back before others receive proceeds",
        incorrect_answer_1:
          "Investors get double their investment back automatically",
        incorrect_answer_2: "Investors must convert to common stock first",
        incorrect_answer_3: "Investors waive their repayment rights",
        rationale:
          "A 1x preference ensures investors recoup their original amount before remaining proceeds are distributed.",
      },
      {
        question:
          "What is the entrepreneur's best approach to handling cumulative dividends in a struggling company?",
        correct_answer: "Negotiate board approval for dividend declarations.",
        incorrect_answer_1: "Ignore them as they rarely matter.",
        incorrect_answer_2: "Convert them to common stock immediately.",
        incorrect_answer_3: "Allow automatic payouts without restrictions.",
        rationale:
          "Board approval helps manage cash flow and dilution risks when cumulative dividends accrue.",
      },
      {
        question:
          "What is a key difference between a SAFE and convertible debt?",
        correct_answer:
          "SAFE is not a loan and has no interest or maturity date",
        incorrect_answer_1: "SAFE accrues interest like a loan",
        incorrect_answer_2: "SAFE requires collateral",
        incorrect_answer_3: "SAFE has fixed repayment terms",
        rationale:
          "Unlike convertible debt, a SAFE is not a loan and avoids interest, maturity dates, and debt obligations.",
      },
      {
        question:
          "What is the key difference between pre-money and post-money valuation?",
        correct_answer:
          "Post-money valuation includes the new investment amount, pre-money does not.",
        incorrect_answer_1:
          "Pre-money valuation is always higher than post-money.",
        incorrect_answer_2:
          "Post-money valuation excludes employee option pools.",
        incorrect_answer_3: "Pre-money valuation includes the cost of debt.",
        rationale:
          "Post-money adds the new investment to the company's pre-investment value, while pre-money is before funding.",
      },
      {
        question:
          "What is the purpose of a valuation cap in a convertible note?",
        correct_answer:
          "To protect early investors from high valuations in the next round",
        incorrect_answer_1: "To set a minimum return for founders",
        incorrect_answer_2: "To determine the company’s revenue target",
        incorrect_answer_3: "To eliminate the need for a discount",
        rationale:
          "A valuation cap ensures that early investors don’t overpay if the next round’s valuation is very high.",
      },
      {
        question: "When does a Voting Agreement typically terminate?",
        correct_answer:
          "Upon an IPO, change of control, or mutual agreement of the parties",
        incorrect_answer_1: "After every annual shareholder meeting",
        incorrect_answer_2:
          "Once dividends are distributed to preferred shareholders",
        incorrect_answer_3:
          "When the company's valuation exceeds a certain threshold",
        rationale:
          "Termination usually happens upon IPO, change of control, or agreed conclusion.",
      },
      {
        question:
          "How are board vacancies typically filled according to a Voting Agreement?",
        correct_answer:
          "By election from the same class of stock that had the original right to elect that director",
        incorrect_answer_1: "By appointment of the CEO",
        incorrect_answer_2: "By shareholder vote from all classes combined",
        incorrect_answer_3: "By government approval",
        rationale:
          "Vacancies are filled by the class that elected the departing director to preserve representation.",
      },
      {
        question:
          "What is the key mindset entrepreneurs should have when raising funds?",
        correct_answer: "Be fully committed with confidence",
        incorrect_answer_1: "Test the waters slowly",
        incorrect_answer_2: "Wait for investors to find you",
        incorrect_answer_3: "Prioritize design over substance",
        rationale:
          "Investors value entrepreneurs who demonstrate full commitment and confidence during fundraising.",
      },
      {
        question:
          "What is the ultimate purpose of mastering the capitalization table?",
        correct_answer:
          "To protect equity and understand the financial impact of every deal",
        incorrect_answer_1: "To avoid working with investors",
        incorrect_answer_2: "To speed up product launches",
        incorrect_answer_3: "To eliminate all forms of dilution",
        rationale:
          "Mastering the cap table ensures informed decision-making and better negotiation outcomes.",
      },
      {
        question:
          "What risk is associated with 'party rounds' in venture financing?",
        correct_answer: "Lack of focused support from any single investor",
        incorrect_answer_1: "Excessive ownership by the lead investor",
        incorrect_answer_2: "Overvaluation of the company",
        incorrect_answer_3: "Faster IPO readiness",
        rationale:
          "Party rounds may involve many small investors who provide less support and attention.",
      },
      {
        question:
          "Why are stock deals more common than asset deals in healthy acquisitions?",
        correct_answer:
          "They transfer the entire company, reducing administrative complexity for sellers",
        incorrect_answer_1: "They always provide higher valuations",
        incorrect_answer_2: "They avoid any form of indemnification",
        incorrect_answer_3: "They eliminate the need for due diligence",
        rationale:
          "Stock deals consolidate the company into the acquirer’s structure, simplifying the process compared to asset deals.",
      },
      {
        question:
          "What is the main risk of full ratchet anti-dilution protection for entrepreneurs?",
        correct_answer: "Severe ownership dilution during down rounds",
        incorrect_answer_1: "Investors losing their liquidation preference",
        incorrect_answer_2: "Higher post-money valuations",
        incorrect_answer_3: "Employee pool expansion without negotiation.",
        rationale:
          "Full ratchet resets the price of earlier preferred shares to the new lower round price, heavily diluting founders during down rounds.",
      },
      {
        question: "What is the main purpose of a pay-to-play provision?",
        correct_answer:
          "To ensure investors continue to invest in future financing rounds.",
        incorrect_answer_1: "To increase founder equity.",
        incorrect_answer_2: "To cap liquidation preferences.",
        incorrect_answer_3: "To extend exercise periods for employees.",
        rationale:
          "Pay-to-play provisions incentivize investors to support the company during future financing rounds, especially in down rounds.",
      },
      {
        question:
          "What is a strategy to maintain effective board functioning as it grows?",
        correct_answer:
          "Cap the number of VC directors and use observer rights",
        incorrect_answer_1: "Eliminate independent board members",
        incorrect_answer_2: "Avoid creating an executive committee",
        incorrect_answer_3: "Add multiple seats for common stockholders",
        rationale:
          "Capping VC seats and using observer roles keeps the board functional without excessive expansion.",
      },
      {
        question:
          "Which information is NOT typically a part of the Corporate Charter?",
        correct_answer:
          "Specific financing round names like Series A or Series B",
        incorrect_answer_1: "Authorized shares",
        incorrect_answer_2: "State of incorporation",
        incorrect_answer_3: "Registered agent details",
        rationale:
          "Financing rounds are terms used in funding but are not included in the Corporate Charter.",
      },
      {
        question:
          "What is the main takeaway for entrepreneurs regarding control terms in term sheets?",
        correct_answer:
          "Understand these terms to maintain balance between investor oversight and founder autonomy",
        incorrect_answer_1:
          "Avoid negotiating control terms to speed up funding",
        incorrect_answer_2:
          "Focus only on valuation, ignoring governance terms",
        incorrect_answer_3: "Delegate all negotiations to investors",
        rationale:
          "A solid grasp of control terms helps founders protect their interests while fostering aligned partnerships.",
      },
      {
        question: "What is the Most Favored Nation (MFN) clause in a SAFE?",
        correct_answer:
          "It allows SAFE investors to inherit better terms given to future investors",
        incorrect_answer_1:
          "It prevents other investors from buying more equity",
        incorrect_answer_2:
          "It guarantees immediate conversion into preferred stock",
        incorrect_answer_3: "It removes valuation caps and discounts",
        rationale:
          "MFN ensures that SAFE investors automatically benefit from more favorable terms offered in future financings.",
      },
      {
        question:
          "Which historical investment example is often cited in discussions of early term sheets?",
        correct_answer: "Digital Equipment Corporation (DEC) by AR&D in 1957",
        incorrect_answer_1: "Google's IPO in 2004",
        incorrect_answer_2: "Facebook's acquisition of Instagram",
        incorrect_answer_3: "Airbnb's Series A in 2009",
        rationale:
          "The DEC deal in 1957 is a classic example of a simple, early term sheet transaction.",
      },
    ].map((item) => {
      const answerOptions = [
        { text: item.correct_answer, isCorrect: true },
        { text: item.incorrect_answer_1, isCorrect: false },
        { text: item.incorrect_answer_2, isCorrect: false },
        { text: item.incorrect_answer_3, isCorrect: false },
      ].sort(() => Math.random() - 0.5);

      return {
        question: item.question,
        answerOptions,
        rationale: item.rationale,
      };
    })
  );

  const handleAnswer = (questionIndex, isCorrect) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = isCorrect;
    setUserAnswers(newAnswers);

    if (
      newAnswers.filter((a) => a !== undefined).length ===
      ventureCapitalQuizData.length
    ) {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const calculateScore = () => {
    const correct = userAnswers.filter((a) => a === true).length;
    return {
      correct,
      total: ventureCapitalQuizData.length,
      percentage: Math.round((correct / ventureCapitalQuizData.length) * 100),
    };
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <header className="text-center mb-20">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Venture Capital Quiz
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Test your knowledge on key venture capital terms and concepts!
          </p>
          <p className="mt-4 text-sm text-amber-600">
            {ventureCapitalQuizData.length} Questions
          </p>
        </header>

        {showResults && (
          <div className="bg-white rounded-xl p-6 mb-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800/80 mb-4">
              Quiz Results
            </h3>
            <div className="text-4xl font-extrabold text-gray-900">
              {calculateScore().correct} / {calculateScore().total}
            </div>
            <div className="text-lg text-gray-600 mt-2">
              {calculateScore().percentage}% Correct
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-amber-500 hover:bg-amber-600 cursor-pointer text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Retry Quiz
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="space-y-8">
            {ventureCapitalQuizData.map((q, index) => (
              <QuizQuestion
                key={index}
                index={index}
                question={q.question}
                answerOptions={q.answerOptions}
                rationale={q.rationale}
                onAnswer={handleAnswer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
