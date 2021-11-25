/*
 * Package @donmahallem/redesigned-robot
 * Source https://donmahallem.github.io/redesigned-robot/
 */

import { Octokit } from '@octokit/core';
import { throttling } from '@octokit/plugin-throttling';
import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import { getTemporaryGitDir, handle } from './handle';

/* eslint-disable  @typescript-eslint/no-unsafe-argument */
describe('handle.ts', () => {
    let sandbox: sinon.SinonSandbox;
    before((): void => {
        sandbox = sinon.createSandbox();
    });

    afterEach((): void => {
        sandbox.reset();
    });
    after((): void => {
        sandbox.restore();
    });
    describe('handle', (): void => {
        it('a', async (): Promise<void> => {
            const d = await getTemporaryGitDir();
            expect(d).to.eq('asdf');
        });
        it('a', async (): Promise<void> => {
            const customOcto = Octokit.plugin(throttling)
            const oc: Octokit = new customOcto({
                throttle: {
                    onRateLimit: (retryAfter, options, octokit) => {
                        octokit.log.warn(
                            `Request quota exhausted for request ${options.method} ${options.url}`
                        );

                        if (options.request.retryCount === 0) {
                            // only retries once
                            octokit.log.info(`Retrying after ${retryAfter} seconds!`);
                            return true;
                        }
                    },
                    onAbuseLimit: (retryAfter, options, octokit) => {
                        // does not retry, only logs a warning
                        octokit.log.warn(
                            `Abuse detected for request ${options.method} ${options.url}`
                        );
                    },
                }
            });
            const d = await handle(oc, { owner: 'donmahallem', repo: 'js-libs' });

            expect(d).to.eq('asdf');
        });
    });
});
