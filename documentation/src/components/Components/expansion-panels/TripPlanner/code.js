import TripPlanner from '!!raw-loader!./index.jsx';
import TripNamePanel from '!!raw-loader!./TripNamePanel.jsx';
import DestinationsPanel from '!!raw-loader!./DestinationsPanel.jsx';
import TravelDatesPanel from '!!raw-loader!./TravelDatesPanel.jsx';
import CarrierPanel from '!!raw-loader!./CarrierPanel.jsx';
import MealPreferencesPanel from '!!raw-loader!./MealPreferencesPanel.jsx';
import styles from '!!raw-loader!./_styles.scss';

export default `/* TripPlanner.jsx */
${TripPlanner}
\`\`\`

\`\`\`jsx
/* TripNamePanel.jsx */
${TripNamePanel}
\`\`\`

\`\`\`jsx
/* DestinationsPanel.jsx */
${DestinationsPanel}
\`\`\`

\`\`\`jsx
/* TravelDatesPanel.jsx */
${TravelDatesPanel}
\`\`\`

\`\`\`jsx
/* CarrierPanel.jsx */
${CarrierPanel}
\`\`\`

\`\`\`jsx
/* MealPreferencesPanel.jsx */
${MealPreferencesPanel}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
