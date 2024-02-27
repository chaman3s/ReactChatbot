import React, { useMemo,memo, useState, useCallback } from 'react'
import { useHistory } from "react-router-dom";
import Ans from"./Ans.js"


// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import Post from './Post.js'
import Link from './Link.js'
import '../../App.css'
import {getDatabase ,ref,set,onValue, push } from 'firebase/database'
import fi from '../LoginSignup/firebaseCon.js';

let db = getDatabase(fi);
// import Com from './Com'
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#0f4d4a',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#0f4d4a',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
}

// all available config props
const config = {
  width: '450px',
  height: '450px',
  hideUserAvatar: true,
  placeholder: 'Type your response.',
  headerTitle: 'ChatBot',
  marginRight: '50%',
}
   /* Paste */


// compnent 


const Chatbot = (props) => {
  let [showChat, setShowChat] = useState(false)
  let [message, setMessage] = useState("Answer generating..");
  let [voice, setVoice] = useState(true);
  let [messageText, setMessageText] = useState([
    {
      id: 'rmcbot',
      message:
        'Hi, I am jarvis ! What can I do for you?',
        user:true,
        trigger: ()=>{},
      },
  ])
  const ValueUpdates = ()=>{
    return (
       <Ans  msg={message} />
    );
  }
  // const nav = useNavigate();
  const history = useHistory();

  const startChat = () => {
    setShowChat(true)
  }
  const hideChat = () => {
    setShowChat(false)
  }
  const [currentTheme, setCurrentTheme] = React.useState('');
  const [UserData,setUserData] = useState({
    userid: '',
    names: '',
    email: ''});

  React.useEffect(() => {
    let usd = localStorage.getItem('user');
    // setUserData.email = usd.email;
    // console.log('hello'+UserData.email);

    const starCountRef = ref(db, 'users/test');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if(data != null){
        localStorage.setItem('step',data.step);
        // console.log('step', data.step);
      }
      // console.log(data);
      // updateStarCount(postElement, data);
      // console.log('hello '+UserData.email);

    });

    
  }, []);


  const callMyfunc = (id) =>{
    // nav("/faq");
    // console.log(`hello ${UserData.email}`);


    // <Navigate to="/faq" replace={true} />
    setTimeout(()=>{

      // console.log('callMyfunc '+id,localStorage.getItem('step'));
      setVoice(false);
       set(ref(db, 'users/' + "test"), {
        step : localStorage.getItem('step')
       });
    },15000)
   
    

      // const starCountRef = ref(db, 'users/' + "test" );
      // onValue(starCountRef, (snapshot) => {
      // const data = snapshot.val();
      // console.log(data);
     
}
const  callMyValue =  async (value)=>{
  // console.log('my value ' + value);
 let  data = {ques: value}
let response= await fetch("http://localhost:8080/api/ques",{
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).catch((error)=>{
    // console.log('error: ',error);
  })
  let resdata = await response.json();
  console.log('response: ',resdata.ans);
  setMessage(resdata.ans);
 
}
const valueChanger= () => {
  setMessage("Answer generating..");
}

console.log("message",message);
    
const Chatt = memo(()=>{
  console.log("chatt",message)
return(
<ChatBot 
speechSynthesis={{ enable: voice, lang: 'en-US' }}
recognitionEnable={voice}
cache= {false}
cacheName= 'step'
steps= {[
  
//   /* Paste */
   {
    id: 'q-firstname',
    message: 'What is your  name?',
   trigger: 'firstname',
 },
  {
   id: 'firstname',
   user: true,
  
trigger: 'qtype',
},

{
id: 'qtype',

options: [
  { value: 1, label: 'Property Tax ?', trigger: ()=>{callMyfunc("hi"); return "4"}, },
  { value: 2, label: ' Professional Tax ?', trigger: ()=>{callMyfunc("hi"); return '3'}},
  { value: 3, label: 'More question',  trigger: ()=>{callMyfunc("hi"); return "moreqtype"}},
  { value: 4, label: 'More Information',  trigger: ()=>{callMyfunc("hi"); return "6"}},
  { value: 5, label: 'Ask question',  trigger: ()=>{callMyfunc("hi"); return "try1"}},
],

},
{
id: 'try1',
message:
  `what can do for you?`,
trigger: ({ value, steps })=>{callMyValue(value); return "try2"},

},
{
id: 'try2',
user: true,
trigger: ({ value, steps })=>{callMyValue(value); return 'try3'},
},
{
id: 'try3',
component: <ValueUpdates />,
// delay:3,
trigger:()=>{callMyfunc("3"); return "qtype"},
},
{
id: '3',
message:
  `Profession tax is the tax levied and collected by the state governments in India.`,
  trigger: ()=>{callMyfunc("3"); return "qtype"},
},
{
id: '4',
message:
  'A property tax or millage rate is an ad valorem tax on the value of a property.',
  trigger: ()=>{callMyfunc("4"); return "qtype"},
},
{
id: '5',
message:
  'An election is a way people can choose their candidate or their preferences in a representative democracy or other form of government',
  trigger: ()=>{callMyfunc("5"); return "qtype"},
},
{
id: '6',
component: <Link />,
trigger: ()=>{callMyfunc("6"); return "qtype"},
},

{
id: 'moreqtype',

options: [


  { value: 5, label: 'Tax Types',  trigger: ()=>{callMyfunc("hi"); return "7"},  },
  { value: 6, label: 'GST Types', trigger: ()=>{callMyfunc("hi"); return "8"},  },
  { value: 7, label: 'Who can claim refund in GST?', trigger: ()=>{callMyfunc("hi"); return "9"},  },
  { value: 8, label: 'Who pays tax invoice?', trigger: ()=>{callMyfunc("hi"); return "10"},  },
  { value: 9, label: 'What is tax invoice?', trigger: ()=>{callMyfunc("hi"); return "11"},  },
  { value: 10, label: 'What is HSN code?', trigger: ()=>{callMyfunc("hi"); return "12"},  },
  { value: 11, label: 'How to calculate TDS?', trigger: ()=>{callMyfunc("hi"); return "13"},  },
  { value: 12, label: 'Why TDS is paid?',  trigger: ()=>{callMyfunc("hi"); return "14"},  },
  { value: 13, label: 'What is the income tax rate?', trigger: ()=>{callMyfunc("hi"); return "15"}, },
  { value: 14, label: 'What is direct and indirect tax?', trigger: ()=>{callMyfunc("hi"); return "16"},  },
  { value: 15, label: 'How tax is calculated?', trigger: ()=>{callMyfunc("hi"); return "17"},  },
  { value: 16, label: 'What is the full form of GDP and GST?', trigger: ()=>{callMyfunc("hi"); return "18"},  },
  { value:17 , label: 'What is the full form of TDS?', trigger: ()=>{callMyfunc("hi"); return "19"},  },
  { value: 18, label: 'What are the two methods of income tax?', trigger: ()=>{callMyfunc("hi"); return "20"},  },
  { value: 19, label: 'What are the 4 types of tax in India?', trigger: ()=>{callMyfunc("hi"); return "21"},  },
  { value: 20, label: 'What is progressive and regressive tax?', trigger: ()=>{callMyfunc("hi"); return "22"},  },
  { value: 21, label: 'What are the two types of income tax in India?', trigger: ()=>{callMyfunc("hi"); return "23"},  },
  { value: 22, label: 'What are the types of tax system in India?', trigger: ()=>{callMyfunc("hi"); return "24"},  },
  { value: 23, label: 'Why TDS is refunded?', trigger: ()=>{callMyfunc("hi"); return "25"},  },
  { value: 24, label: 'Who collects GST? ', trigger: ()=>{callMyfunc("hi"); return "26"},  },
  { value:25 , label: 'What is GST return?', trigger: ()=>{callMyfunc("hi"); return "27"},  },
  { value: 26, label: 'Why is GST used? ', trigger: ()=>{callMyfunc("hi"); return "28"},  },
  { value: 27, label: 'What is GST rate?', trigger: ()=>{callMyfunc("hi"); return "29"},  },
  { value: 28, label: 'What is TCS tax?', trigger: ()=>{callMyfunc("hi"); return "30"},  },
  { value: 29, label: 'What is TDS rate', trigger: ()=>{callMyfunc("hi"); return "31"},  },
  { value: 30, label: 'Why is TDS paid?', trigger: ()=>{callMyfunc("hi"); return "32"},  },
  { value: 31, label: 'How to calculate GST ?', trigger: ()=>{callMyfunc("hi"); return "33"},  },
  { value: 56, label: 'Go back', trigger: ()=>{callMyfunc("hi"); return "qtype"},  },

],

},
{
id: '7',
message:
  'Tax occurs on physical assets, including property and transactions, such as a sale of stock, or a home. Types of taxes include income, corporate, capital gains, property, inheritance, and sales.',
  trigger: ()=>{callMyfunc("7"); return "qtype"},
},
{
id: '8',
message:
  'There are Four GST types namely Integrated Goods and Services Tax (IGST), State Goods and Services Tax (SGST), Central Goods and Services Tax (CGST), and Union Territory Goods and Services Tax (UTGST).',
  trigger: ()=>{callMyfunc("8"); return "qtype"},
},
{
id: '9',
message:
  'GST refund is a process in which, registered taxpayers can claim excess amount if they paid more than the GST liability. They can claim after submitting a refund application with the necessary details in the GST portal.',
  trigger: ()=>{callMyfunc("9"); return "qtype"},
},
{
id: '10',
message:
  'It is not necessary that only a person supplying goods or services needs to issue an invoice. The GST law mandates that any registered person buying goods or services from an unregistered person needs to issue a payment voucher as well as a tax invoice',
  trigger: ()=>{callMyfunc("10"); return "qtype"},
},
{
id: '11',
message:
  'Tax invoice is an invoice issued for taxable supply of goods & services. Tax invoice broadly contains details like description, quantity, value of goods/service, tax charged thereon and other particulars as may be prescribed. Tax invoice is a primary evidence for recipient to claim input tax credit of goods & service.',
  trigger: ()=>{callMyfunc("11"); return "qtype"},
},
{
id: '12',
message:
  ' HSN code stands for “Harmonized System of Nomenclature”. This system has been introduced for the systematic classification of goods all over the world. HSN code is a 6-digit uniform code that classifies 5000+ products and is accepted worldwide.',
  trigger: ()=>{callMyfunc("12"); return "qtype"},
},

{
id: '14',
message:
  'The payee will receive credits against the TDS payments, which they can claim against their actual tax liability while filing the annual ITR. The purpose of TDS may have been to reduce the chances of tax evasion by the recipient of the income. But, for an honest taxpayer, it also brings a few benefits.',
  trigger: ()=>{callMyfunc("14"); return "qtype"},
},
{
id: '15',
message:
  'Surcharge applicable as per tax rates are listed below across all categories mentioned above: 10% of Income Tax for income > ₹50 lakh. 15% of Income Tax for income > ₹1 crore. 25% of Income Tax for income > ₹2 crore. 37%* of Income Tax for income > ₹5 crore.',
  trigger: ()=>{callMyfunc("15"); return "qtype"},
},

{
id: '17',
message:
  'Generally, tax is calculated by multiplying the applicable tax rate with the taxable income. Though it seems simple, it consists of several steps, including calculating gross salary, calculating deductions and exemptions, calculating tax payable, deducting tax already paid, etc.',
  trigger: ()=>{callMyfunc("17"); return "qtype"},
},

{
id: '19',
message:
  'Tax Deducted at Source (TDS)',
  trigger: ()=>{callMyfunc("19"); return "qtype"},
},
{
id: '20',
message:
  'The Income Tax Act permits two methods of accounting, mercantile system of accounting and cash system of accounting.',
  trigger: ()=>{callMyfunc("20"); return "qtype"},
},
{
id: '21',
message:
  'The direct tax includes income tax, gift tax, capital gain tax, etc while indirect tax includes value-added tax, service tax, goods and services tax, customs duty, etc. The Central Government of India imposes taxes such as customs duty, central excise duty, income tax, and service tax.',
  trigger: ()=>{callMyfunc("21"); return "qtype"},
},
{
id: '22',
message:
  'In a progressive tax system, the tax rate increases progressively with higher income levels. High-income individuals or entities pay a higher percentage of their income in taxes compared to low-income individuals. In a regressive tax system, the tax rate decreases as income levels increase.',
  trigger: ()=>{callMyfunc("22"); return "qtype"},
},
{
id: '23',
message:
  'There are two types of taxes - direct taxes and indirect taxes. Taxes you pay on goods and services are indirect taxes. On the other hand, income taxes deducted in the form of TDS from your salary is an example of direct tax.',
  trigger: ()=>{callMyfunc("23"); return "qtype"},
},
{
id: '24',
message:
  'The tax structure in India is divided into direct and indirect taxes. While direct taxes are levied on taxable income earned by individuals and corporate entities, the burden to deposit taxes is on the assessees themselves.',
  trigger: ()=>{callMyfunc("24"); return "qtype"},
},
{
id: '25',
message:
  'A TDS Refund arises when the taxes paid by way of TDS are greater than the actual tax payable calculated for the Financial Year. It is calculated after consolidating income earned from various sources.',
  trigger: ()=>{callMyfunc("25"); return "qtype"},
},
{
id: '26',
message:
  'GST is a unified tax system that replaced multiple indirect taxes levied by both the Central and State Governments. Under GST, both the Central and State Governments share the authority to levy and collect taxes on goods and services.',
  trigger: ()=>{callMyfunc("26"); return "qtype"},
},
{
id: '27',
message:
  'GST return is a document that will contain all the details of your sales, purchases, tax collected on sales (output tax), and tax paid on purchases (input tax). Once you file GST returns, you will need to pay the resulting tax liability (money that you owe the government).',
  trigger: ()=>{callMyfunc("27"); return "qtype"},
},
{
id: '28',
message:
  'One Nation, One Tax: GST replaced multiple indirect taxes levied by the Central and State Governments, such as excise duty, service tax, value-added tax (VAT), and others. It brought uniformity in the tax structure across India, eliminating the cascading effect of taxes.',
  trigger: ()=>{callMyfunc("28"); return "qtype"},
},
{
id: '29',
message:
  'GST rates in India for various goods and services are divided into four slabs: 5% GST, 12% GST, 18% GST, and 28% GST. Since the inception of the Goods and Services Tax, the GST council has revised the GST rates for various products several times (GST).',
  trigger: ()=>{callMyfunc("29"); return "qtype"},
},
{
id: '30',
message:
  'Tax collection at source (TCS) is an extra amount collected as tax by a seller of specified goods from the buyer at the time of sale over and above the sale amount and is remitted to the government account.',
  trigger: ()=>{callMyfunc("30"); return "qtype"},
},
{
id: '31',
message:
  'The deduction of TDS varies based on the source of your income and it ranges between 1% to 30%. The person on whom the responsibility of deducting tax is imposed has to deduct tax at source at appropriate rates and the deducted sum is deposited to the credit of government of India.',
  trigger: ()=>{callMyfunc("31"); return "qtype"},
},
{
id: '32',
message:
  'The payee will receive credits against the TDS payments, which they can claim against their actual tax liability while filing the annual ITR. The purpose of TDS may have been to reduce the chances of tax evasion by the recipient of the income. But, for an honest taxpayer, it also brings a few benefits.',
  trigger: ()=>{callMyfunc("32"); return "qtype"},
},
{
id: '33',
message:
  ' GST is a broad-based tax of 10% on most goods, services and other items sold or consumed in Australia. To work out the cost of an item including GST, multiply the amount exclusive of GST by 1.1. To work out the GST component, divide the GST inclusive cost by 11.',
  trigger: ()=>{callMyfunc("33"); return "qtype"},
},
{
id: '18',
message:
  "The Indian government expected that implementing a single taxation system—Goods and Services Tax (GST—would significantly boost the nation's Gross Domestic Product (GDP).",
  trigger: ()=>{callMyfunc("18"); return "qtype"},
},
{
id: '13',
message:
  "Typically, the employer deducts TDS from his employee's salary at the 'average rate' applicable to his estimated total income. The general formula is: Average Income Tax Rate = Income Tax Payable (computed through slab rates) / Estimated income for the financial year.",
  trigger: ()=>{callMyfunc("13"); return "qtype"},
},
{
id: '16',
message:
  "Direct taxes are paid directly to the government and are levied on one's income and profits. However, indirect taxes are totally opposite and are paid to the government if one makes any purchases of goods and services.",
  trigger: ()=>{callMyfunc("16"); return "qtype"}
},
{
id: 'q-submit',
message: 'Do you have any other questions !?',
trigger: 'submit',
},
{
id: 'submit',
options: [
  { value: 'y', label: 'Yes', trigger: 'no-submit' },
  { value: 'n', label: 'No', trigger: 'end-message' },
],

},
{
id: 'no-submit',

options: [
  { value: 1, label: 'Property Tax ?', trigger: '4' },
  { value: 2, label: ' Professional Tax ?', trigger: '3' },
  { value: 3, label: 'Election Department', trigger: '5' },
  { value: 4, label: 'More Information', trigger: '6' },
],

},
{
id: 'end-message',
trigger: ()=>{callMyfunc('end-message'); return "qtype"},
component: <Post />,
asMessage: true,
end: true,
},
]}
{...config}
/>)},[message])

  return (
    <ThemeProvider theme={theme}>
      <div className="bot">
      <div style={{ display: showChat ? 'none' : '' }}>
        <Chatt/>
      </div>
      <div>
        {!showChat ? (
          <button className="btn" onClick={() => startChat()}>
            <i className="fa fa-minus"></i>
          </button>
        ) : (
          <button className="btn" onClick={() => hideChat()}>
            <i className="fa fa-plus"></i>
          </button>
        )}
      </div>
      </div>
    </ThemeProvider>
    
  )
}

export default Chatbot;
