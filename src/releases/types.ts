/*
 * Package @donmahallem/redesigned-robot
 * Source https://donmahallem.github.io/redesigned-robot/
 */

import { Endpoints } from '@octokit/types';

// ListReleases
export type GetReleasesParameters = Endpoints['GET /repos/{owner}/{repo}/releases']['parameters'];
export type GetReleasesResponse = Endpoints['GET /repos/{owner}/{repo}/releases']['response'];
export type GetReleasesData = Endpoints['GET /repos/{owner}/{repo}/releases']['response']['data'];
export type GetReleaseData = GetReleasesData[0]
// Create Release
export type CreateReleaseParameters = Endpoints['POST /repos/{owner}/{repo}/releases']['parameters'];
export type CreateReleaseResponse = Endpoints['POST /repos/{owner}/{repo}/releases']['response'];
export type CreateReleaseData = Endpoints['POST /repos/{owner}/{repo}/releases']['response']['data'];
