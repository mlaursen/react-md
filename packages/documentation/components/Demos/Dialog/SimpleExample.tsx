import React, { FunctionComponent, Fragment } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@react-md/dialog";
import { useToggle } from "@react-md/utils";
import { Button } from "@react-md/button";
import { Text } from "@react-md/typography";

const SimpleExample: FunctionComponent = () => {
  const { toggled, toggle, enable, disable } = useToggle();
  return (
    <Fragment>
      <Button id="dialog-toggle-1" onClick={enable}>
        Show Dialog
      </Button>
      <Dialog id="dialog-1" visible={toggled} onRequestClose={disable}>
        <DialogHeader>
          <DialogTitle>Example</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Text>
            Aliqua deserunt deserunt tempor velit proident. Fugiat aliquip esse
            ipsum voluptate elit est elit. Labore aliquip magna in nulla nulla
            non exercitation dolor occaecat deserunt. Commodo eu irure labore
            reprehenderit tempor.
          </Text>
          <Text>
            Laborum culpa dolore do consectetur laborum nostrud quis aute
            deserunt eiusmod id. Laboris tempor quis reprehenderit id eiusmod
            anim ut consectetur fugiat culpa amet. Tempor aliquip sit irure
            fugiat. Commodo nulla Lorem ea aute fugiat et sunt. In incididunt
            pariatur nostrud deserunt ipsum aute.
          </Text>
          <Text>
            Magna aliqua eiusmod velit nulla. Consectetur est pariatur id in
            nisi ut ea irure eiusmod ea. Exercitation commodo minim nulla tempor
            et voluptate nostrud.
          </Text>
          <Text>
            Deserunt enim enim dolore nostrud et. Laboris culpa fugiat laboris
            fugiat velit tempor proident ea consequat. Nulla deserunt irure
            pariatur aliquip reprehenderit ipsum nulla ex officia deserunt
            aliquip fugiat incididunt mollit. Ipsum commodo sunt sint commodo
            quis sit ad nostrud ipsum duis aliqua. Proident cupidatat velit
            labore velit aliqua enim cillum ea excepteur labore nostrud.
          </Text>
          <Text>
            Qui consequat culpa voluptate velit excepteur irure cillum
            exercitation tempor commodo. Veniam dolor irure ex fugiat et
            consequat aute ut aute adipisicing exercitation. Labore laborum
            fugiat veniam qui ipsum. Est cupidatat nisi nostrud nostrud
            voluptate cillum reprehenderit. Deserunt excepteur nisi labore elit
            do ex labore labore ad in cupidatat ipsum cillum. Aliqua pariatur
            enim labore velit. Do ipsum occaecat cupidatat ullamco amet veniam
            ipsum deserunt exercitation cillum deserunt magna.
          </Text>
          <Text>
            Adipisicing ad qui non officia anim consectetur tempor. Mollit in ex
            exercitation deserunt enim reprehenderit ea nostrud consequat
            nostrud sint Lorem et sunt. Voluptate ea quis veniam nulla non esse
            ut incididunt eu commodo et pariatur voluptate. Consectetur eu
            ullamco laboris ex eiusmod amet minim est qui occaecat anim. Mollit
            sit velit adipisicing nostrud dolor tempor commodo reprehenderit non
            duis anim ullamco.
          </Text>
          <Text>
            Quis consectetur eu eiusmod consectetur laboris. Ea consectetur
            aliquip velit ipsum ad cillum ipsum nisi minim amet laboris. Culpa
            commodo in elit sint elit laboris dolore incididunt Lorem culpa
            tempor.
          </Text>
          <Text>
            Eu culpa sit duis ad occaecat eu minim nulla nostrud. Enim est Lorem
            aliqua deserunt irure in Lorem mollit ut esse. Sint do laboris
            cillum laborum magna eiusmod ex. Exercitation ut reprehenderit velit
            nostrud. In et nostrud excepteur laborum occaecat adipisicing ea
            veniam reprehenderit. Nostrud officia amet ipsum irure ipsum ut.
            Commodo nostrud amet irure nisi nisi id velit do.
          </Text>
          <Text>
            Eiusmod anim aliqua labore ad quis magna exercitation nostrud Lorem
            exercitation laborum officia officia aliqua. Aliquip irure aliquip
            officia voluptate velit Lorem reprehenderit sunt voluptate eu.
            Aliquip sint ea sit id sint. Labore dolore laboris esse velit
            laborum minim ipsum sint irure nisi nulla minim nostrud.
          </Text>
          <Text>
            Consequat Lorem nulla consequat est aliqua do nostrud consectetur ex
            nulla velit commodo ut eiusmod. Ad sunt consequat ullamco magna sint
            eu commodo irure ex ut irure elit. Dolor velit officia sint nostrud
            nisi elit culpa adipisicing aliquip. Sit commodo laborum et velit
            labore irure ex incididunt elit. Quis ea sit ea laboris sint irure
            nulla mollit do proident. Excepteur commodo laboris fugiat duis
            officia pariatur veniam cillum nostrud magna commodo ea commodo
            irure.
          </Text>
        </DialogContent>
        <DialogFooter>
          <Button id="dialog-1-close" onClick={disable}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default SimpleExample;
