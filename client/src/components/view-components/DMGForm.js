import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";

const data = require("../../data/sample-data.json")

function DMGForm() {
  const { register, handleSubmit } = useForm();
  const [totalDmg, setTotalDmg] = useState(data.baseDmg);
  const [critDmg, setCritDmg] = useState(data.baseDmg * 2);

  const onSubmitForm = FormData => {
    let dmg = data.baseDmg * FormData.pips || data.baseDmg;
    const boost = 1 + parseFloat(FormData.boost) / 100;

    if (FormData.boostFlat) dmg += parseInt(FormData.boostFlat);
    if (boost) dmg *= boost;

    if (FormData.enchant && FormData.enchant > 0)
      dmg += parseFloat(FormData.enchant) * (boost ? boost : 1);

    if (FormData.aura && FormData.aura > 0)
      dmg *= parseFloat(FormData.aura);

    let wrapper = { "dmg": dmg };

    for (let id in FormData) {
      if (id !== "pips" && id !== "enchant" && id !== "aura" && id !== "boost" && id !== "boostFlat") {
        FormData[id].forEach(val => wrapper.dmg *= parseFloat(val));
      }
    }

    dmg = wrapper.dmg;

    setTotalDmg(parseInt(dmg));
    setCritDmg(parseInt(dmg * 2));
  }

  return (
    <>
      <Container>
        <br />
        <h2 className="text-center">Damage Calculator for {data.spell}</h2>
        <br />
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <Form.Row className="justify-content-center">
            <Col sm={3}>
              <Form.Group controlId="statBoost">
                <Form.Label>Stat Boost (%)</Form.Label>
                <Form.Control type="float" name="boost" ref={register()} />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group controlId="statBoostFlat">
                <Form.Label>Stat Boost (+)</Form.Label>
                <Form.Control type="number" name="boostFlat" ref={register()} />
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Row className="justify-content-center">
            <Form.Group>
              {Array.from(Array(12).keys()).map(i => (
                <Form.Check inline label={i+1} type="radio" name="pips" id={`pip-${i + 1}`} value={i+1} ref={register()} />
              ))}
            </Form.Group>
          </Form.Row>
          
          <Row>
            <Col sm={3}>
              <fieldset>
                <Form.Label>Enchantment</Form.Label>
                <Form.Group controlId="enchantment">
                  <Form.Check type="radio" label="None" name="enchant" id="enone" value={0} ref={register()} />
                  {data.enchants.map(item => (
                    <Form.Check type="radio" label={item.name} name="enchant" id={item.name} value={item.value} ref={register()} />
                  ))}
                </Form.Group>
              </fieldset>
            </Col>
            <Col sm={3}>
              <fieldset>
                <Form.Label>Aura</Form.Label>
                <Form.Group controlId="aura">
                  <Form.Check type="radio" label="None" name="aura" id="anone" value={0} ref={register()} />
                  {data.auras.map(item => (
                    <Form.Check type="radio" label={item.name} name="aura" id={item.name} value={item.value} ref={register()} />
                  ))}
                </Form.Group>
              </fieldset>
            </Col>
          </Row>

          <br />
          <h2>Blades</h2>

          <Row>
            {data.blades.map(blade => (
              <Col sm={3}>
                <fieldset>
                  <Form.Label>{blade.name}</Form.Label>
                  <Form.Group controlId="blades">
                    {blade.variants.map(item => (
                      <Form.Check type="checkbox" label={item.name} name={blade.id} id={blade.id + item.name} value={item.value} ref={register()} />
                    ))}
                  </Form.Group>
                </fieldset>
              </Col>
            ))}
          </Row>

          <br />
          <h2>Traps</h2>

          <Row>
            {data.traps.map(trap => (
              <Col sm={3}>
                <fieldset>
                  <Form.Label>{trap.name}</Form.Label>
                  <Form.Group controlId="hex">
                    {trap.variants.map(item => (
                      <Form.Check type="checkbox" label={item.name} name={trap.id} id={trap.id + item.name} value={item.value} ref={register()} />
                    ))}
                  </Form.Group>
                </fieldset>
              </Col>
            ))}
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