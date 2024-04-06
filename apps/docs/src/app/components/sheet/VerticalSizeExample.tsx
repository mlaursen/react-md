"use client";
import {
  Box,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Option,
  Select,
  Sheet,
  Typography,
  useToggle,
  type SheetVerticalSize,
} from "react-md";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import { useState, type ReactElement } from "react";

export default function VerticalSizeExample(): ReactElement {
  const { toggled, enable, disable } = useToggle();
  const [verticalSize, setVertical] =
    useState<SheetVerticalSize>("recommended");

  return (
    <Box stacked>
      <Button onClick={enable}>Show</Button>
      <Select
        label="Vertical Size"
        value={verticalSize}
        onChange={(event) => setVertical(event.currentTarget.value)}
      >
        {verticalSizes.map((size) => (
          <Option key={size} value={size}>
            {size}
          </Option>
        ))}
      </Select>
      <Sheet
        aria-label="Example"
        position="top"
        verticalSize={verticalSize}
        visible={toggled}
        onRequestClose={disable}
      >
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <Button aria-label="Close" buttonType="icon" onClick={disable}>
            <CloseIcon />
          </Button>
        </DialogHeader>
        <DialogContent>
          <LoremIpsum />
        </DialogContent>
      </Sheet>
    </Box>
  );
}

const verticalSizes: readonly SheetVerticalSize[] = [
  "none",
  "touch",
  "recommended",
];

function LoremIpsum(): ReactElement {
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
      <Typography>
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Pellentesque eget mattis erat. Etiam vitae tellus ipsum. Morbi vitae
        sapien eu lacus cursus vehicula. Nunc varius hendrerit nibh et finibus.
        Nullam mollis pharetra dolor, eu laoreet dui sodales vitae. Donec
        molestie ac massa non dapibus. Suspendisse volutpat ligula vitae
        fermentum aliquam. Nullam eu congue urna. Nulla a libero quis risus
        pharetra ornare.
      </Typography>
      <Typography>
        In interdum lectus et neque mollis, ut gravida mauris sagittis. Nunc
        pellentesque lacus sem, vel lacinia neque hendrerit eu. Nulla facilisi.
        Vivamus eleifend ligula erat, sit amet iaculis est feugiat ut. Aliquam
        mauris nisi, lobortis et tempor eu, cursus vel justo. Curabitur sit amet
        aliquam urna. Nulla eget mi ac tortor condimentum sodales at facilisis
        tellus. Curabitur viverra elementum arcu, non scelerisque tortor congue
        ac. Sed suscipit quam rhoncus, rhoncus dolor malesuada, auctor dui.
        Vestibulum nec iaculis risus. Etiam scelerisque maximus mattis.
        Vestibulum et felis id felis gravida sagittis sed non metus. In sed mi
        rhoncus, tempor nibh non, elementum nulla.
      </Typography>
      <Typography>
        Proin auctor pellentesque orci, sed dapibus libero tempus vel. Cras
        venenatis ex in ipsum tempor ultricies. Etiam dapibus commodo dolor, ut
        pretium purus sagittis et. Fusce nunc turpis, porta non tortor
        scelerisque, egestas iaculis turpis. Nullam eget ultrices mauris, sit
        amet lobortis ipsum. Proin commodo, eros eu facilisis laoreet, sapien
        lectus viverra mi, eget congue felis turpis a orci. Integer condimentum
        vehicula volutpat. Nam id mauris quis nisl pharetra vulputate eget
        accumsan nulla. Nam rutrum ante orci, vitae tincidunt velit aliquet
        vitae. Cras mattis dignissim consectetur. Sed sapien velit, consectetur
        sed nibh a, venenatis rhoncus dui. Donec vitae hendrerit augue, eget
        venenatis nisi.
      </Typography>
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
