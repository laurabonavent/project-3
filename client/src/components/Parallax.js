import React, { Component } from "react";

import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import DarkRed from "../images/dark-red.svg";
import Yellow from "../images/yellow.svg";
import OrangeRed from "../images/orange-red.svg";
import Purple from "../images/purple.svg";
import LightOrange from "../images/light-orange.svg";
import LightPink from "../images/light-pink.svg";
import Rocket from "../images/rocket.png";

export default class ParallaxTest extends Component {
  render() {
    return (
      <div>
        <Parallax ref={(ref) => (this.parallax = ref)} pages={3}>
          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            className='background'
            style={{
              //   backgroundImage: url("stars", true),
              backgroundSize: "cover",
            }}></ParallaxLayer>

          <ParallaxLayer
            offset={0.5}
            speed={0.5}
            style={{ opacity: 15 }}
            className='background'>
            <img
              src={DarkRed}
              alt=''
              style={{
                display: "block",
                width: "20%",
                marginLeft: "70%",
                marginTop: "-18%",
              }}
            />
            <img
              alt=''
              src={LightPink}
              style={{
                display: "block",
                width: "30%",
                marginLeft: "20%",
                marginTop: "-18%",
              }}
            />
            <img
              alt=''
              src={Purple}
              style={{
                display: "block",
                width: "20%",
                marginLeft: "65%",
                marginTop: "8%",
              }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 5 }}>
            <img
              alt=''
              src={Yellow}
              style={{ display: "block", width: "10%", marginLeft: "10%" }}
            />
            <img
              alt=''
              src={LightOrange}
              style={{ display: "block", width: "20%", marginLeft: "75%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.2} speed={0.4} style={{ opacity: 10 }}>
            <img
              src={OrangeRed}
              alt=''
              style={{
                display: "block",
                width: "70%",
                marginLeft: "15%",
                marginTop: "-18%",
              }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.5} speed={-0.3} style={{ opacity: 10 }}>
            <img
              alt=''
              src={Purple}
              className='purple'
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
            <img
              alt=''
              src={LightOrange}
              className='light-orange'
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
            <img
              alt=''
              src={LightPink}
              className='light-pink'
              style={{ display: "block", width: "100%", marginLeft: "0%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.0}
            speed={0}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}>
            <img className='dark-red' src={DarkRed} alt='' />
            <img className='yellow' src={Yellow} alt='' />
            <img className='orange-red' src={OrangeRed} alt='' />
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={0} factor={1}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              eos, harum, fuga fugit illo magni atque accusantium a quo magnam
              voluptatibus hic debitis velit exercitationem excepturi dolores
              veniam, suscipit qui itaque quam. Deleniti ducimus dolor
              voluptatibus, molestias, similique sed tenetur dignissimos
              repellendus illum laudantium repudiandae ea? Eveniet labore dolore
              et tempore tenetur, quos aliquam facilis laboriosam minus cum
              deserunt rerum beatae omnis sint iste nam? Distinctio aliquam
              nemo, exercitationem dolor, quibusdam obcaecati quod commodi hic
              maiores doloribus repellat. Facilis est, omnis fugiat suscipit
              iure in iste laboriosam ab officiis laudantium alias vitae dolorem
              voluptas corrupti consequatur architecto aspernatur id neque
              libero? Consectetur suscipit sapiente error animi! Modi eos
              corporis, exercitationem vitae qui voluptas provident eaque odio
              possimus asperiores rerum, commodi laboriosam molestiae odit
              officiis beatae adipisci atque tempore deleniti harum ex expedita
              laborum eligendi veritatis. Distinctio impedit ipsum ullam
              consequatur corporis necessitatibus magni cumque laudantium in
              blanditiis, quae, ducimus amet dicta saepe repellat rerum dolor
              perspiciatis commodi dolorum corrupti aspernatur! Voluptate
              blanditiis sed odit sunt accusamus sit mollitia consequatur autem
              vero similique nostrum incidunt, corporis maxime, quam beatae,
              provident molestias vel nobis illum reprehenderit. Repellat saepe,
              expedita dolorem provident ipsam minus blanditiis enim rem ducimus
              aliquam ad accusamus laudantium sit neque itaque nostrum numquam
              tenetur ab, minima accusantium. Non earum facere nihil repellendus
              cupiditate, error aspernatur libero, aliquid cum odit sequi, dicta
              aliquam iste dolor consequatur! Deleniti id explicabo, laudantium,
              ratione modi omnis nisi quis voluptatibus tempore unde praesentium
              veritatis quam. Est error alias nobis maxime nulla esse similique
              ullam eligendi rerum saepe impedit repellat voluptatem rem odio
              voluptatibus autem at animi, eum, veniam eius! Rerum debitis
              impedit quasi distinctio ea eum tempore, pariatur eaque, quis,
              unde eos perspiciatis alias maxime vero fugiat! Expedita quisquam
              architecto ipsum vero reiciendis qui nulla amet quo dolorem
              molestiae temporibus neque atque exercitationem quaerat nam iure,
              assumenda magnam, molestias voluptatibus libero pariatur velit
              eveniet voluptates vitae. Labore consequuntur placeat natus dicta,
              consequatur repellat cum quos culpa pariatur, laboriosam ab. Eos
              autem nihil deserunt animi dolore cupiditate, architecto aliquam.
              A libero exercitationem rerum illo nostrum cum sit unde animi
              recusandae architecto earum fugit quam natus perspiciatis repellat
              quasi atque, perferendis vel commodi quisquam quae illum in.
              Debitis eius corporis at alias. Odio aperiam vero nemo porro
              similique est at unde magni quisquam itaque consequuntur
              doloremque maiores id debitis, saepe enim officiis dolorem
              repudiandae amet rerum aut. Harum impedit magnam quo ratione ea,
              ut aspernatur porro in sed! Excepturi labore odit sequi possimus
              laboriosam, quam, molestiae mollitia est obcaecati voluptates ea
              voluptas neque fuga similique nobis expedita cum sit veritatis
              dolorum error. Error unde amet at incidunt autem necessitatibus
              possimus tempora consectetur magnam natus iure, vitae eaque illum
              dolore quae temporibus illo sit, quas rem? Impedit itaque fugit
              eaque, necessitatibus reprehenderit accusamus reiciendis ex
              adipisci in tempora voluptatum unde labore quod sit quidem
              explicabo dolore distinctio facere fuga? Expedita, voluptatum
              repudiandae. Molestiae nihil nam, omnis perferendis, consectetur
              doloribus consequatur accusantium dolorum autem adipisci, porro
              ducimus! Illum omnis debitis qui, corrupti, blanditiis unde
              commodi tempore optio veritatis est veniam eos placeat soluta?
              Voluptas fuga unde, laborum eos magni repellendus reprehenderit
              numquam cum. Dignissimos reprehenderit necessitatibus eveniet
              ducimus numquam, nesciunt placeat illum excepturi doloremque?
              Porro qui earum eaque obcaecati, velit quidem quos esse, sit
              dolore, sint officiis. Natus nesciunt dolorum incidunt aut, cum
              necessitatibus tempora quia, pariatur officiis debitis adipisci
              delectus. Quasi dolorem reiciendis unde illum mollitia
              exercitationem labore expedita deserunt enim nostrum doloribus
              iure sint et aperiam, tempore ratione iste ea a repudiandae
              possimus molestiae magnam similique minus! Voluptas culpa,
              excepturi, ea accusamus aut, ipsam error deserunt quos tenetur
              quam nam obcaecati nihil. Exercitationem rerum quibusdam quod, eum
              nobis similique rem, ut quos voluptatem maiores quo reprehenderit
              quasi, earum facilis voluptate molestiae recusandae? Iure
              laudantium, officia aliquam assumenda ad illo vitae fuga,
              inventore incidunt voluptatem iste libero odit deleniti ipsa
              nostrum obcaecati veniam, repellendus unde. Totam ducimus quis
              soluta animi quaerat praesentium ab dolorem, similique unde.
              Molestiae porro veritatis incidunt sequi suscipit dolores sit
              repellat perferendis vel molestias, consectetur consequuntur?
              Quod, eaque dolorem. Fugiat sit quas neque qui perferendis
              asperiores voluptate voluptatibus laudantium? Expedita minus
              voluptatibus tenetur obcaecati sit dolor, quisquam cupiditate
              nesciunt nobis aliquid. Sunt, sed ratione repellendus at harum
              consequatur dolores et eum tempore dolorem architecto
              consequuntur, accusantium maxime, ad libero similique dolor
              suscipit quidem! Iste numquam mollitia dolores ullam, nulla
              placeat delectus ut maiores soluta suscipit voluptatibus aperiam
              impedit repudiandae modi animi sint illo consequuntur, error
              beatae neque! Nisi vitae quae voluptate iure ipsum earum suscipit
              quos illo adipisci, eos culpa dolores ullam cupiditate repudiandae
              ab fugiat quasi nihil eaque harum corporis rem qui beatae ea. Fuga
              delectus, optio laudantium minus quisquam saepe eaque rem.
              Repudiandae repellendus nam harum soluta culpa ea excepturi.
              Mollitia cupiditate inventore exercitationem incidunt ipsam!
              Laudantium inventore quod consequatur aliquid? Necessitatibus
              maxime voluptatem pariatur molestiae! Non eos, libero, odio
              perspiciatis, laborum veritatis dicta molestias molestiae corrupti
              quam aut magni velit mollitia. Voluptatem asperiores accusamus
              temporibus autem qui, natus quisquam eaque nihil fugit tempora
              sed! Ad hic, cum sed alias consequuntur ex doloribus pariatur vel
              illum iure eum earum, repellendus culpa aliquid id consectetur
              iusto asperiores neque eaque totam magnam atque voluptatibus sint
              natus? Tempore nobis, ea enim inventore fuga officia et eius!
              Aliquid, harum, sint odit vitae hic quibusdam amet maiores velit
              voluptate incidunt dolor atque natus dolorum repudiandae nihil
              inventore ducimus dolores! Quibusdam eligendi dolorem error sed et
              corrupti optio fugit! Alias perspiciatis similique reprehenderit
              officiis eum veniam dicta qui molestias. Asperiores dolorem quasi
              necessitatibus veniam doloribus doloremque numquam, eum deleniti
              voluptatum aperiam consequatur perferendis, quos impedit dicta
              omnis molestias odio consequuntur expedita dolorum. Tempora
              praesentium tempore exercitationem vitae fuga, sunt unde magnam,
              quidem ullam quisquam sapiente accusamus explicabo veritatis
              consequuntur atque ab eveniet libero, laborum vero! Quisquam
              aspernatur ex provident. Voluptatibus animi quos incidunt iusto
              expedita quisquam repudiandae dolorum vero! Totam adipisci non
              culpa fuga necessitatibus quam harum! Omnis facilis doloribus
              voluptates voluptatum, optio sapiente, debitis eius autem eum,
              quaerat quasi? Culpa molestiae incidunt quam nulla mollitia quos
              molestias velit consectetur odit nobis, maiores hic obcaecati nemo
              laudantium.
            </p>
          </ParallaxLayer>
          <ParallaxLayer
            offset={2}
            speed={-0.5}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              margin: "-75% 5% 5% 5%",
            }}>
            <img alt='' src={Rocket} style={{ width: "20%" }} />
          </ParallaxLayer>
        </Parallax>
      </div>
    );
  }
}
