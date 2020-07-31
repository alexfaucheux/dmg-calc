import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";

function DMGForm() {
  const { register, handleSubmit } = useForm();
  const [totalDmg, setTotalDmg] = useState(665);
  const [critDmg, setCritDmg] = useState(665 * 2);
  const baseDmg = 665;

  const onSubmitForm = FormData => {
    let dmg = baseDmg;
    const boost = 1 + parseInt(FormData.boost) / 100;
    
    if (FormData.boostFlat) dmg += parseInt(FormData.boostFlat);
    if (boost) dmg *= boost;

    if (FormData.enchant && FormData.enchant > 0)
      dmg += parseFloat(FormData.enchant) * (boost ? boost : 1);

    if (FormData.aura && FormData.aura > 0)
      dmg *= parseFloat(FormData.aura);

    FormData.bb.forEach(val => dmg *= parseFloat(val));
    FormData.bs.forEach(val => dmg *= parseFloat(val));
    FormData.feint.forEach(val => dmg *= parseFloat(val));
    FormData.hex.forEach(val => dmg *= parseFloat(val));

    setTotalDmg(parseInt(dmg));
    setCritDmg(parseInt(dmg * 2));
  }

  return (
    <>
      <Container>
        <h2 className="text-center">Damage Calculator for Power Nova</h2>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Row className="justify-content-center">
            <Col sm={3}>
              <Form.Group controlId="statBoost">
                <Form.Label>Stat Boost (%)</Form.Label>
                <Form.Control type="number" name="boost" ref={register()} />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group controlId="statBoostFlat">
                <Form.Label>Stat Boost (+)</Form.Label>
                <Form.Control type="number" name="boostFlat" ref={register()} />
              </Form.Group> 
            </Col>
          </Form.Row>
          <Row>
            <Col sm={3}>
              <fieldset>
                <Form.Label>Enchantment</Form.Label>
                <Form.Group controlId="enchantment">
                  <Form.Check type="radio" label="None" name="enchant" id="strong" value={0} ref={register()} />
                  <Form.Check type="radio" label="Strong" name="enchant" id="strong" value={100} ref={register()} />
                  <Form.Check type="radio" label="Giant" name="enchant" id="giant" value={125} ref={register()} />
                  <Form.Check type="radio" label="Monstrous" name="enchant" id="monstrous" value={175} ref={register()} />
                  <Form.Check type="radio" label="Gargantuan" name="enchant" id="gargantuan" value={225} ref={register()} />
                  <Form.Check type="radio" label="Colossal" name="enchant" id="colossal" value={275} ref={register()} />
                  <Form.Check type="radio" label="Epic" name="enchant" id="epic" value={300} ref={register()} />
                </Form.Group>
              </fieldset>
            </Col>
            <Col sm={3}>
              <fieldset>
                <Form.Label>Aura</Form.Label>
                <Form.Group controlId="aura">
                  <Form.Check type="radio" label="None" name="aura" id="an" value={0} ref={register()} />
                  <Form.Check type="radio" label="Amplify" name="aura" id="aa" value={1.15} ref={register()} />
                  <Form.Check type="radio" label="Magnify" name="aura" id="am" value={1.20} ref={register()} />
                  <Form.Check type="radio" label="Chastisement / Punishment" name="aura" id="ac" value={1.25} ref={register()} />
                  <Form.Check type="radio" label="Berserk" name="aura" id="ab" value={1.30} ref={register()} />
                  <Form.Check type="radio" label="Frenzy" name="aura" id="af" value={1.40} ref={register()} />
                </Form.Group>
              </fieldset>
            </Col>
            <Col sm={3}>
              <fieldset>
                <Form.Label>Balance Blades</Form.Label>
                <Form.Group controlId="blades">
                  <Form.Check type="checkbox" label="regular" name="bb" id="bb" value={1.25} ref={register()} />
                  <Form.Check type="checkbox" label="item" name="bb" id="ibb" value={1.25} ref={register()} />
                  <Form.Check type="checkbox" label="treasure card" name="bb" id="tbb" value={1.25} ref={register()} />
                  <Form.Check type="checkbox" label="sharpened" name="bb" id="sbb" value={1.35} ref={register()} />
                  <Form.Check type="checkbox" label="item sharpened" name="bb" id="isbb" value={1.35} ref={register()} />
                  <Form.Check type="checkbox" label="tc sharpened" name="bb" id="tbb" value={1.35} ref={register()} />
                </Form.Group>
              </fieldset>
            </Col>
            <Col sm={3}>
              <fieldset>
                <Form.Label>Bladestorm</Form.Label>
                <Form.Group controlId="bladestorm">
                  <Form.Check type="checkbox" label="regular" name="bs" id="bs" value={1.20} ref={register()} />
                  <Form.Check type="checkbox" label="item" name="bs" id="ibs" value={1.20} ref={register()} />
                  <Form.Check type="checkbox" label="treasure card" name="bs" id="tbs" value={1.20} ref={register()} />
                  <Form.Check type="checkbox" label="sharpened" name="bs" id="sbs" value={1.30} ref={register()} />
                  <Form.Check type="checkbox" label="item sharpened" name="bs" id="isbs" value={1.30} ref={register()} />
                  <Form.Check type="checkbox" label="tc sharpened" name="bs" id="tbs" value={1.30} ref={register()} />
                </Form.Group>
              </fieldset>
            </Col>
            <Col sm={3}>
              <fieldset>
                <Form.Label>Hex</Form.Label>
                <Form.Group controlId="hex">
                  <Form.Check type="checkbox" label="regular" name="hex" id="h" value={1.30} ref={register()} />
                  <Form.Check type="checkbox" label="item" name="hex" id="ih" value={1.30} ref={register()} />
                  <Form.Check type="checkbox" label="treasure card" name="hex" id="th" value={1.30} ref={register()} />
                  <Form.Check type="checkbox" label="potent" name="hex" id="ph" value={1.40} ref={register()} />
                  <Form.Check type="checkbox" label="item potent" name="hex" id="iph" value={1.40} ref={register()} />
                  <Form.Check type="checkbox" label="tc potent" name="hex" id="tph" value={1.40} ref={register()} />
                </Form.Group>
              </fieldset>
            </Col>
            <Col sm={3}>
              <fieldset>
                <Form.Label>Feint</Form.Label>
                <Form.Group controlId="feint">
                  <Form.Check type="checkbox" label="regular" name="feint" id="f" value={1.70} ref={register()} />
                  <Form.Check type="checkbox" label="item" name="feint" id="if" value={1.70} ref={register()} />
                  <Form.Check type="checkbox" label="treasure card" name="feint" id="tf" value={1.70} ref={register()} />
                  <Form.Check type="checkbox" label="potent" name="feint" id="pf" value={1.80} ref={register()} />
                  <Form.Check type="checkbox" label="item potent" name="feint" id="ipf" value={1.80} ref={register()} />
                  <Form.Check type="checkbox" label="tc potent" name="feint" id="tpf" value={1.80} ref={register()} />
                </Form.Group>
              </fieldset>
            </Col>
          </Row>
          <div className="text-center">
            <Button variant="primary" type="submit">Calculate Damage</Button>
          </div>
        </Form>
        <h1 className="text-center">Total Damage: {totalDmg}</h1>
        <h3 className="text-center">Total Crit Damage: {critDmg}</h3>
      </Container>
    </>
  );
}

export default DMGForm;