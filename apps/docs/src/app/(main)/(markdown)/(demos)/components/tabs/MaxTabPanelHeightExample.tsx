"use client";

import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useMaxTabPanelHeight } from "@react-md/core/tabs/useMaxTabPanelHeight";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { Slide } from "@react-md/core/transition/Slide";
import { SlideContainer } from "@react-md/core/transition/SlideContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function MaxtabPanelHeightExample(): ReactElement {
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();

  const { getMaxTabPanelHeightProps } = useMaxTabPanelHeight({
    getTabPanelsProps,

    // optional default height
    defaultHeight: "30rem",

    // if you need to merge a ref, can provide it here
    // ref,

    // if you need custom inline style, can provide it here or as the
    // `getMaxTabPanelHeightProps` argument
    // style,
  });

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Tab 1</Tab>
        <Tab {...getTabProps(1)}>Tab 2</Tab>
        <Tab {...getTabProps(2)}>Tab 3</Tab>
      </TabList>
      <SlideContainer {...getMaxTabPanelHeightProps()}>
        <Slide {...getTabPanelProps(0)}>
          <Tab1Content />
        </Slide>
        <Slide {...getTabPanelProps(1)}>
          <Tab2Content />
        </Slide>
        <Slide {...getTabPanelProps(2)}>
          <Tab3Content />
        </Slide>
      </SlideContainer>
    </>
  );
}

function Tab1Content(): ReactElement {
  return (
    <>
      <Typography>
        Duis tincidunt justo ut magna ullamcorper euismod. Aliquam ultricies,
        libero a mollis convallis, neque libero rutrum dolor, at blandit justo
        turpis at ex. Pellentesque ullamcorper urna in tempor feugiat. Praesent
        eget ligula eget tortor mattis suscipit. Aenean volutpat nisi ac
        vestibulum congue. Nulla in tellus quis mauris facilisis tempor.
        Pellentesque malesuada at tellus sed bibendum. Donec ultricies vitae
        dolor a sodales. Sed non justo ac nibh euismod pulvinar. Duis vel risus
        in risus luctus pulvinar et nec mauris. Aliquam blandit tellus nunc, sit
        amet feugiat diam facilisis vitae. Aliquam nisi elit, scelerisque et
        luctus a, mollis eu ex. Pellentesque eget fringilla metus. Ut molestie
        commodo odio finibus consectetur.
      </Typography>
      <Typography>
        Pellentesque molestie ipsum ac felis bibendum vehicula. Aliquam accumsan
        augue ac sapien iaculis fringilla. Sed feugiat est vitae ornare
        consectetur. Nulla lacinia quam nisl, ut mollis lacus placerat at.
        Vivamus non consectetur sapien. Ut ac mollis ante, id ultricies mi.
        Mauris tincidunt at erat sed vestibulum. Curabitur eget tellus venenatis
        sem tincidunt molestie. Morbi tellus sem, accumsan non vestibulum
        fermentum, tristique ac magna. Curabitur congue consectetur nibh quis
        placerat. Integer ultrices orci nisi, vel ornare mauris fringilla at.
      </Typography>
    </>
  );
}

function Tab2Content(): ReactElement {
  return (
    <>
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
    </>
  );
}

function Tab3Content(): ReactElement {
  return (
    <>
      <Typography>
        Sed ultricies nibh ut leo dapibus, eget volutpat lectus auctor. Etiam
        egestas urna nec neque posuere, eget feugiat lacus aliquet. Aliquam nunc
        nulla, faucibus at libero et, dapibus vulputate nisi. Cras sit amet
        sagittis tortor. Donec nec velit nulla. Mauris dictum vel ipsum quis
        bibendum. Aenean elementum nisi urna, vel finibus lacus iaculis ut.
      </Typography>
    </>
  );
}
