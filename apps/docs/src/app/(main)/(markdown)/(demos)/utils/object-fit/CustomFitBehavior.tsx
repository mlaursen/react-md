import { Box } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { objectFit } from "@react-md/core/objectFit";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function CustomFitBehavior(): ReactElement {
  return (
    <>
      <Typography>Contain (default)</Typography>
      <Box align="stretch" grid fullWidth>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/200/300?image=30"
            alt=""
            className={objectFit({ fit: "contain" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/300/200?image=3"
            alt=""
            className={objectFit({ fit: "contain" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/300?image=1008"
            alt=""
            className={objectFit({ fit: "contain" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/100/110?image=233"
            alt=""
            className={objectFit({ fit: "contain" })}
          />
        </Card>
      </Box>
      <Typography>Cover</Typography>
      <Box align="stretch" grid fullWidth>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/200/300?image=30"
            alt=""
            className={objectFit({ fit: "cover" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/300/200?image=3"
            alt=""
            className={objectFit({ fit: "cover" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/300?image=1008"
            alt=""
            className={objectFit({ fit: "cover" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/100/110?image=233"
            alt=""
            className={objectFit({ fit: "cover" })}
          />
        </Card>
      </Box>
      <Typography>Fill</Typography>
      <Box align="stretch" grid fullWidth>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/200/300?image=30"
            alt=""
            className={objectFit({ fit: "fill" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/300/200?image=3"
            alt=""
            className={objectFit({ fit: "fill" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/300?image=1008"
            alt=""
            className={objectFit({ fit: "fill" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/100/110?image=233"
            alt=""
            className={objectFit({ fit: "fill" })}
          />
        </Card>
      </Box>
      <Typography>None</Typography>
      <Box align="stretch" grid fullWidth>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/200/300?image=30"
            alt=""
            className={objectFit({ fit: "none" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/300/200?image=3"
            alt=""
            className={objectFit({ fit: "none" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/300?image=1008"
            alt=""
            className={objectFit({ fit: "none" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/100/110?image=233"
            alt=""
            className={objectFit({ fit: "none" })}
          />
        </Card>
      </Box>
      <Typography>Scale Down</Typography>
      <Box align="stretch" grid fullWidth>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/200/300?image=30"
            alt=""
            className={objectFit({ fit: "scale-down" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/300/200?image=3"
            alt=""
            className={objectFit({ fit: "scale-down" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/300?image=1008"
            alt=""
            className={objectFit({ fit: "scale-down" })}
          />
        </Card>
        <Card align="center" justify="center">
          <img
            src="https://picsum.photos/100/110?image=233"
            alt=""
            className={objectFit({ fit: "scale-down" })}
          />
        </Card>
      </Box>
    </>
  );
}
