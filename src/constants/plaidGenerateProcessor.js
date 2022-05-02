import PlaidSilaAccount from '../components/accounts/processor/PlaidSilaAccount';
import AccountContextual from '../components/accounts/processor/AccountContextual';
import CreateLinkToken from '../components/accounts/processor/CreateLinkToken';
import GeneratePublicToken from '../components/accounts/processor/GeneratePublicToken';
import GenerateAccessToken from '../components/accounts/processor/GenerateAccessToken';
import RetrieveAccountCredentials from '../components/accounts/processor/RetrieveAccountCredentials';
import LinkProcessorToken from '../components/accounts/processor/LinkProcessorToken';

export const DEFAULT_PROCESSOR_NAME = 'sila_money';

export const DEFAULT_GP_ROUTES = [{
  title: 'Plaid + Sila Account',
  disabled: false,
  component: PlaidSilaAccount
}];

const COMMON_CONTENT_AND_LINKS = [{
  'plaidSila' : [{
        content: 'In order to use the Plaid + Sila integration, a user must have accounts at both Plaid and Sila. You may follow the links below to begin this process. You may also watch a tutorial below on how to accomplish both tasks. When both tasks are complete, you may go to the next step.',
      },
      {
        link: 'https://dashboard.plaid.com/signup',
        content: 'To open an account with Plaid, go here: https://dashboard.plaid.com/signup',
      },
      {
        link: 'https://console.silamoney.com/register',
        content: 'To open an account with Sila, go here: https://console.silamoney.com/register',
    }
  ],
  'linkToken' : [{
        content: 'A link_token is a short-lived, one-time use token that is used to authenitcate your app with Plaid Link. You will need to form the request with your client_id, secret, and a few other required parameters from your Plaid sandbox environment. Please input your client_id and secret below to authenticate the API request and generate a link token. These credentials are held locally and are completely secure.',
      },
      {
        link: 'https://plaid.com/docs/api/tokens/#linktoken',
        content: 'To learn more about link tokens, go here: https://plaid.com/docs/api/tokens/#linktoken',
      },
      {
      link: 'https://dashboard.plaid.com/team/keys',
      content: 'To see your client ID and secret, go here: https://dashboard.plaid.com/team/keys',
    }
  ],
  'publicToken' : [{
        content: 'To generate a public token, you must integrate with Plaid Link. Initialize Link by passing in the link_token you just generated. When the Link flow is completed, Link will pass back a public_token via the onSuccess callback.',
      },
      {
        link: 'https://plaid.com/docs/link/',
        content: 'For more information on initializing and receiving data back from Link, see the Link documentation here: https://plaid.com/docs/link/',
    }
  ],
  'accesssToken': [{
      content: "The public token, which you can see in the response body, was generated by Plaid Link. To call Plaid's Exchange Token endpoint, also known as the Access Token, you must pass through the public token and account ID to generate an Access Token.",
    },
    {
      link: 'https://plaid.com/docs/api/tokens/#itempublic_tokenexchange',
      content: 'Learn more about exchanging pubic tokens for access tokens here: https://plaid.com/docs/api/tokens/#itempublic_tokenexchange',
    }
  ],
  'retrieveAccountCredentials': [{
      content: "In addition to a public_token, Plaid Link will also return an accounts array. The accounts array will contain information about bank accounts associated with the credentials entered by the user. In order to create a processor token, you will need to pass in the access token you just generated, along with the account ID. A processor is also needed, which is provided below.",
    },
    {
      link: 'https://dashboard.plaid.com/link/account-select',
      content: 'Learn more about the accounts array here: https://dashboard.plaid.com/link/account-select',
    }
  ],
  'processorToken': [{
      content: "Congratulations! You have successfully generated your processor token, which has been returned by the Plaid API. All that's left to do is provide a name, and link the bank account!",
    },
    {
      link: 'https://plaid.com/docs/api/processors/#processortokencreate',
      content: 'Learn more about this process here: https://plaid.com/docs/api/processors/#processortokencreate',
    }
  ]
}];

export const plaidSignUpSteps = [{
    title: 'Plaid + Sila Account',
    disabled: false,
    context: COMMON_CONTENT_AND_LINKS[0]['plaidSila'],
    component: AccountContextual
  },
  {
    title: 'Enable Plaid account for integration',
    disabled: true,
    context: [{
        link: 'https://dashboard.plaid.com/team/integrations',
        content: 'You must enable your Plaid account for the integration, to do this you must go to https://dashboard.plaid.com/team/integrations',
      },
      {
        content: 'If the Sila integration is off, simply click the “Enable” button for Sila to enable to the partner integration. You may watch the tutorial below to see how to accomplish this task.',
    }],
    component: AccountContextual
  },
  {
    title: 'Complete Plaid Application Profile',
    disabled: true,
    context: [{
        content: 'Before you are able to link any bank accounts, you will need to provide Plaid with some basic information about your app, such as your company name and website. Some banks require this information before you can connect to them. This step also helps your end-users learn more about how your product uses their banking information. You may follow the link below to begin this process. You may also watch the tutorial on how to accomplish this task.',
      },
      {
        link: 'https://dashboard.plaid.com/team/application',
        content: 'To complete the Plaid Application Profile, go here: https://dashboard.plaid.com/team/application.',
    }],
    component: AccountContextual
  },
  {
    title: 'Create a Link Token',
    disabled: true,
    context: COMMON_CONTENT_AND_LINKS[0]['linkToken'],
    component: CreateLinkToken
  },
  {
    title: 'Generate a Public Token',
    disabled: true,
    context: COMMON_CONTENT_AND_LINKS[0]['publicToken'],
    component: GeneratePublicToken,
  },
  {
    title: 'Generate an Accesss Token',
    disabled: true,
    context: COMMON_CONTENT_AND_LINKS[0]['accesssToken'],
    component: GenerateAccessToken,
  },
  {
    title: 'Retrieve Account ID and credentials',
    disabled: true,
    context: COMMON_CONTENT_AND_LINKS[0]['retrieveAccountCredentials'],
    component: RetrieveAccountCredentials,
  },
  {
    title: 'Link via Processor Token',
    disabled: true,
    context: COMMON_CONTENT_AND_LINKS[0]['processorToken'],
    component: LinkProcessorToken,
  }
];

export const havePlaidAccountSteps = [{
    title: 'Plaid + Sila Account',
    disabled: false,
    context: COMMON_CONTENT_AND_LINKS[0]['plaidSila'],
    component: AccountContextual
  },
  {
    title: 'Create a Link Token',
    disabled: false,
    context: COMMON_CONTENT_AND_LINKS[0]['linkToken'],
    component: CreateLinkToken
  },
  {
    title: 'Generate a Public Token',
    disabled: true,
    context: COMMON_CONTENT_AND_LINKS[0]['publicToken'],
    component: GeneratePublicToken,
  },
  {
    title: 'Generate an Accesss Token',
    disabled: true,
    context: COMMON_CONTENT_AND_LINKS[0]['accesssToken'],
    component: GenerateAccessToken,
  },
  {
    title: 'Retrieve Account ID and credentials',
    disabled: true,
    context: COMMON_CONTENT_AND_LINKS[0]['retrieveAccountCredentials'],
    component: RetrieveAccountCredentials,
  },
  {
    title: 'Link via Processor Token',
    disabled: true,
    context: COMMON_CONTENT_AND_LINKS[0]['processorToken'],
    component: LinkProcessorToken,
  }
];