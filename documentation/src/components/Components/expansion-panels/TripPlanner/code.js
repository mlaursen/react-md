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

\`\`\`js
/* TripNamePanel.jsx */
${TripNamePanel}
\`\`\`

\`\`\`js
/* DestinationsPanel.jsx */
${DestinationsPanel}
\`\`\`

\`\`\`js
/* TravelDatesPanel.jsx */
${TravelDatesPanel}
\`\`\`

\`\`\`js
/* CarrierPanel.jsx */
${CarrierPanel}
\`\`\`

\`\`\`js
/* MealPreferencesPanel.jsx */
${MealPreferencesPanel}
\`\`\`

\`\`\`scss
/* _styles.scss */
${styles}
`;
