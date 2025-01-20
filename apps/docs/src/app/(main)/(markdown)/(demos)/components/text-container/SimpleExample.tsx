import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import styles from "./SimpleExample.module.scss";

export default function SimpleExample(): ReactElement {
  return (
    <TextContainer className={styles.container}>
      <Typography type="headline-2">
        Neque porro quisquam est qui dolorem
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat
        diam et mauris dapibus bibendum. Praesent vehicula maximus egestas.
        Mauris lacinia lectus elit, quis placerat massa egestas sit amet. Sed
        massa ex, commodo sed orci nec, accumsan sagittis sem. Curabitur
        malesuada urna sit amet leo vehicula lobortis. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Integer fringilla tincidunt nunc, in efficitur nibh placerat quis.
        Vivamus a est quis nunc vestibulum facilisis. Ut ut massa a ante
        ultricies imperdiet. Orci varius natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Ut viverra volutpat ex, eu
        scelerisque tortor interdum non. Ut cursus mi id turpis tristique, sed
        fringilla urna fermentum. Suspendisse potenti. Suspendisse hendrerit
        scelerisque porttitor. Duis nisi dolor, ultrices quis fermentum ac,
        interdum eu nisl.
      </Typography>
      <Typography>
        Donec nec ultricies tellus. Suspendisse potenti. Cras condimentum, arcu
        tempus ornare aliquet, purus elit bibendum justo, eu pretium mauris leo
        ac ligula. Sed imperdiet odio in vulputate vestibulum. Integer vitae
        commodo elit. Phasellus gravida eros at dolor varius, in tempor metus
        tincidunt. Nulla dictum nec mi in dignissim. Duis non mauris a turpis
        posuere tempor ut vel eros. Donec volutpat velit sapien, et varius velit
        viverra sit amet. Aenean id magna sit amet velit rutrum porta in a
        tortor. Integer vel feugiat tortor. Nullam posuere, nulla ut viverra
        dignissim, eros quam mattis erat, eget pretium felis erat non mi. Proin
        varius est id pretium volutpat. Aliquam erat volutpat.
      </Typography>
      <Typography>
        Mauris porta mauris et feugiat blandit. Sed placerat non mauris at
        ultrices. Fusce malesuada sem ut nulla malesuada aliquam. Pellentesque
        fermentum aliquam lorem, at semper ex facilisis ac. Fusce laoreet odio
        vitae sem dictum, at sagittis erat imperdiet. Nullam lacinia tortor at
        diam tempus malesuada. Aliquam vitae euismod mi. Integer ac enim commodo
        felis sollicitudin condimentum id at ex. Mauris lobortis est nunc, et
        scelerisque eros malesuada vel.
      </Typography>
      <Typography>
        Integer vel mi nulla. Pellentesque eu tellus quam. Sed sagittis erat
        neque, quis varius justo mattis sed. Donec ac sollicitudin ante. Duis
        sollicitudin suscipit nulla, sed feugiat felis vehicula quis. Nunc
        ullamcorper hendrerit dolor ut consectetur. Praesent arcu diam, placerat
        non sagittis vel, varius ut turpis. Maecenas id mi at nulla dapibus
        rhoncus ac nec nulla. Donec mattis mi convallis odio elementum, at
        pulvinar leo ornare. Praesent consequat augue in tellus sodales
        fermentum.
      </Typography>
      <Typography>
        Sed ultricies nibh ut leo dapibus, eget volutpat lectus auctor. Etiam
        egestas urna nec neque posuere, eget feugiat lacus aliquet. Aliquam nunc
        nulla, faucibus at libero et, dapibus vulputate nisi. Cras sit amet
        sagittis tortor. Donec nec velit nulla. Mauris dictum vel ipsum quis
        bibendum. Aenean elementum nisi urna, vel finibus lacus iaculis ut.
      </Typography>
    </TextContainer>
  );
}
